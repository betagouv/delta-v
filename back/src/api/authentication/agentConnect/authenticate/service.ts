import { v4 as uuidv4 } from 'uuid';
import { AgentConnectService } from '../../../../core/agentConnect/service';
import { User } from '../../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';

interface ILoginServiceOptions {
  code: string;
  state: string;
  nonce: string;
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
  nonce,
  agentConnectService,
  userRepository,
}: ILoginServiceOptions): Promise<IAuthenticateServiceResponse> => {
  const tokenSet = await agentConnectService.getTokenSet(code, state, nonce);
  console.log('🚀 ~ tokenSet:', tokenSet);
  const userInfo = await agentConnectService.getUserInfo(tokenSet.access_token as string);
  console.log('🚀 ~ userInfo:', userInfo);

  // Vérifiez que le nonce correspond à celui envoyé initialement
  if (tokenSet.nonce !== nonce) {
    throw new Error('Invalid nonce');
  }

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
};
