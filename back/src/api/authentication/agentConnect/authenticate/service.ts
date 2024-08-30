import { v4 as uuidv4 } from 'uuid';
import { JwtPayload, verify, decode } from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as jose from 'jose';
import { AgentConnectService } from '../../../../core/agentConnect/service';
import { User } from '../../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import { config } from '../../../../loader/config';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { IAuthenticateRequest } from './validator';

interface ILoginServiceOptions {
  code: string;
  state: string;
  nonce: string;
  iss: string;
  req: ValidatedRequest<IAuthenticateRequest>;
  agentConnectService: AgentConnectService;
  userRepository: UserRepositoryInterface;
}

interface IAuthenticateServiceResponse {
  user: User;
  idToken: string;
}

export const service = async ({
  code,
  state,
  iss,
  req,
  nonce,
  agentConnectService,
  userRepository,
}: ILoginServiceOptions): Promise<IAuthenticateServiceResponse> => {
  try {
    const params = agentConnectService.getCallbackParams(req);
    console.log('🚀 ~ params:', params);
    const tokenSet = await agentConnectService.getTokenSet(params, state, nonce);
    console.log('🚀 ~ tokenSet:', tokenSet);

    // Ajoutez cette vérification
    if (!tokenSet.access_token) {
      throw new Error('No access token received');
    }

    // Vérifiez si le token est expiré
    if (tokenSet.expires_at && Date.now() > tokenSet.expires_at * 1000) {
      throw new Error('Access token has expired');
    }

    // Vérification du JWT (id_token)
    const idToken = tokenSet.id_token as string;
    const decodedToken = decode(idToken, { complete: true });
    console.log('🚀 ~ decodedToken:', decodedToken);

    if (!decodedToken) {
      throw new Error('Invalid ID token');
    }

    // Vérifiez l'algorithme de signature
    if (decodedToken.header.alg !== config.AGENTCONNECT_ID_TOKEN_SIGNED_RESPONSE_ALG) {
      throw new Error('Invalid token algorithm');
    }

    console.log('🚀 ~ publicKey: heeeeeeeere');

    // Vérifiez la signature du JWT
    // Note: Vous devez obtenir la clé publique d'AgentConnect pour vérifier la signature
    // Cette étape peut varier selon la façon dont vous obtenez la clé publique
    const publicKey = await agentConnectService.getPublicKey();
    console.log('🚀 ~ publicKey:', publicKey);

    try {
      const { payload, protectedHeader } = await jose.jwtVerify(idToken, publicKey, {
        issuer: config.AGENTCONNECT_ISSUER,
        audience: config.AGENTCONNECT_CLIENT_ID,
      });
      console.log('Verified Token Payload:', payload);
      console.log('Protected Header:', protectedHeader);
    } catch (error) {
      console.error('Token verification error:', error);
      throw new Error('Invalid token signature');
    }
    // Vérification du nonce

    const payload = decodedToken.payload as JwtPayload;
    console.log('🚀 ~ payload:', payload);
    if (payload.nonce !== nonce) {
      throw new Error('Invalid nonce');
    }

    let currentTokenSet = tokenSet;

    if (currentTokenSet.expired()) {
      console.log('Token expired, refreshing...');
      currentTokenSet = await agentConnectService.refreshTokenSet(currentTokenSet);
    }

    const userInfo = await agentConnectService.getUserInfo(currentTokenSet.access_token as string);

    const user = await userRepository.getOneByEmail(userInfo.email);

    if (user) {
      return { user, idToken: tokenSet.id_token as string };
    }

    const newUser: User = {
      email: userInfo.email,
      password: 'password',
      id: uuidv4(),
    };

    await userRepository.createUser(newUser);

    return { user: newUser, idToken: tokenSet.id_token as string };
  } catch (error) {
    console.error('Error in authentication service:', error);
    throw error;
  }
};
