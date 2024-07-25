import { AgentConnectService } from '../../../core/agentConnect/service';
import { UserRepositoryInterface } from '../../../repositories/user.repository';

interface ILoginServiceOptions {
  code: string;
  agentConnectService: AgentConnectService;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  code,
  agentConnectService,
  userRepository,
}: ILoginServiceOptions): Promise<void> => {
  const agent = await agentConnectService.authenticate(code);

  const userInDatabase = await userRepository.getOneByEmail(agent.email);

  if (!userInDatabase) {
    await userRepository.createUser({
      email: agent.email,
      password: '',
      firstName: agent.firstName,
      lastName: agent.lastName,
      username: agent.username,
      isAgent: true,
    });
  }
};
