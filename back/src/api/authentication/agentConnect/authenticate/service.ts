import { decode } from 'jsonwebtoken';
import { Redis } from 'ioredis';
import { AgentConnectService } from '../../../../core/agentConnect/service';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import { config } from '../../../../loader/config';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { generateAccessToken, generateRefreshToken } from '../../../../core/jwt/generateToken';
import { convertToMilliseconds } from '../../../../utils/convertToMilliseconds.util';
import { calculateRefreshTokenExpiry } from '../../../../utils/refreshTokenExpiration';
import { generateDeterministicUuid } from '../../../../utils/uuidGenerator.util';
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
    console.log('🚀 ~ tokenSet:', tokenSet);

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

    const uuidUid = generateDeterministicUuid(userInfo.uid);

    let user = await userRepository.getOneByEmail(userInfo.email);

    if (!user) {
      user = {
        email: userInfo.email,
        id: uuidUid,
        enabled: true,
      };
      await userRepository.createUser(user);
    } else {
      await userRepository.updateUser(user.id, { id: uuidUid });
    }

    const tokenSetExpiry = calculateRefreshTokenExpiry();
    const accessTokenExpiry = Math.min(
      convertToMilliseconds(config.ACCESS_TOKEN_LIFE),
      tokenSetExpiry,
    );
    const accessTokenExpiryInSeconds = accessTokenExpiry / 1000;

    const accessToken = await generateAccessToken(
      {
        userId: userInfo.uid,
        email: userInfo.email,
        name: userInfo.given_name,
        lastName: userInfo.usual_name,
        isAgent: true,
      },
      accessTokenExpiryInSeconds,
    );

    const refreshTokenExpiry = Math.min(
      tokenSetExpiry,
      convertToMilliseconds(config.REFRESH_TOKEN_LIFE),
    );

    const refreshTokenExpiryInSeconds = refreshTokenExpiry / 1000;
    const refreshToken = await generateRefreshToken(
      {
        userId: userInfo.uid,
        email: userInfo.email,
      },
      refreshTokenExpiryInSeconds,
    );

    await redisClient.set(
      refreshToken,
      JSON.stringify({
        ...tokenSet,
        expires_at: tokenSetExpiry,
      }),
      'EX',
      refreshTokenExpiryInSeconds,
    );

    return {
      idToken,
      accessToken,
      refreshToken,
      lastRefresh: refreshTokenExpiry === tokenSetExpiry ? true : false,
    };
  } catch (error) {
    console.error('Error in authentication service:', error);
    throw error;
  }
};
