import { decode } from 'jsonwebtoken';
import { Redis } from 'ioredis'; // Import Redis type
import { v4 as uuidv4 } from 'uuid';
import { AgentConnectService } from '../../../../core/agentConnect/service';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import { config } from '../../../../loader/config';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { generateAccessToken, generateRefreshToken } from '../../../../core/jwt/generateToken';
import { convertToMilliseconds } from '../../../../utils/convertToMilliseconds.util';
import { IAuthenticateRequest } from './validator';

interface ILoginServiceOptions {
  state: string;
  nonce: string;
  req: ValidatedRequest<IAuthenticateRequest>;
  agentConnectService: AgentConnectService;
  userRepository: UserRepositoryInterface;
  redisClient: Redis; // Add Redis client to the options
}

interface IAuthenticateServiceResponse {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  lastRefresh: boolean;
}

export const service = async ({
  state,
  req,
  nonce,
  agentConnectService,
  userRepository,
  redisClient,
}: ILoginServiceOptions): Promise<IAuthenticateServiceResponse> => {
  try {
    const params = agentConnectService.getCallbackParams(req);
    const tokenSet = await agentConnectService.getTokenSet(params, state, nonce);

    if (!tokenSet.access_token) {
      throw new Error('No access token received');
    }

    if (tokenSet.expires_at && Date.now() > tokenSet.expires_at * 1000) {
      throw new Error('Access token has expired');
    }

    const idToken = tokenSet.id_token as string;
    const decodedToken = decode(idToken, { complete: true });

    if (!decodedToken) {
      throw new Error('Invalid ID token');
    }

    if (decodedToken.header.alg !== config.AGENTCONNECT_ID_TOKEN_SIGNED_RESPONSE_ALG) {
      throw new Error('Invalid token algorithm');
    }

    try {
      const { payload } = await agentConnectService.verifyIdToken(idToken);

      if (payload.nonce !== nonce) {
        throw new Error('Invalid nonce');
      }
    } catch (error) {
      throw new Error('Invalid token signature');
    }

    const userInfo = await agentConnectService.getUserInfo(tokenSet.access_token as string);

    let user = await userRepository.getOneByEmail(userInfo.email);

    if (!user) {
      user = {
        email: userInfo.email,
        id: uuidv4(),
        password: '',
        enabled: true,
      };
      await userRepository.createUser(user);
    }

    console.log('🚀 ~ user:', user);

    const accessTokenExpiry = Math.min(
      convertToMilliseconds(config.ACCESS_TOKEN_LIFE),
      tokenSet.expires_at
        ? new Date(tokenSet.expires_at * 1000).getTime() - new Date().getTime()
        : convertToMilliseconds(config.ACCESS_TOKEN_LIFE),
    );

    const accessToken = await generateAccessToken(
      {
        userId: userInfo.uid,
        email: userInfo.email,
        name: userInfo.given_name,
        lastName: userInfo.usual_name,
        isAgent: true,
      },
      accessTokenExpiry,
    );

    console.log(convertToMilliseconds(config.REFRESH_TOKEN_LIFE));
    console.log(tokenSet.expires_at);
    console.log(new Date((tokenSet.expires_at ?? 0) * 1000).getTime() - new Date().getTime());

    const refreshTokenExpiry = Math.min(
      convertToMilliseconds(config.REFRESH_TOKEN_LIFE),
      tokenSet.expires_at
        ? new Date(tokenSet.expires_at * 1000).getTime() - new Date().getTime()
        : convertToMilliseconds(config.REFRESH_TOKEN_LIFE),
    );

    const refreshToken = await generateRefreshToken(
      {
        userId: userInfo.uid,
        email: userInfo.email,
      },
      refreshTokenExpiry,
    );

    await redisClient.set(refreshToken, JSON.stringify(tokenSet), 'EX', refreshTokenExpiry);

    return {
      idToken,
      accessToken,
      refreshToken,
      lastRefresh: refreshTokenExpiry === tokenSet.expires_at ? true : false,
    };
  } catch (error) {
    console.error('Error in authentication service:', error);
    throw error;
  }
};
