import { decode } from 'jsonwebtoken';
import * as jose from 'jose';
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

    const publicKey = await agentConnectService.getPublicKey();

    try {
      const { payload } = await jose.jwtVerify(idToken, publicKey, {
        issuer: config.AGENTCONNECT_ISSUER,
        audience: config.AGENTCONNECT_CLIENT_ID,
      });

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

    const accessToken = await generateAccessToken({
      userId: userInfo.uid,
      email: userInfo.email,
      name: userInfo.given_name,
      lastName: userInfo.usual_name,
      isAgent: true,
    });

    const refreshTokenExpiry = Math.min(
      convertToMilliseconds(config.REFRESH_TOKEN_LIFE),
      tokenSet.expires_at
        ? tokenSet.expires_at * 1000 - Date.now()
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
    };
  } catch (error) {
    console.error('Error in authentication service:', error);
    throw error;
  }
};
