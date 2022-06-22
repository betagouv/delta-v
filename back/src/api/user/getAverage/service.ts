import { UserRepositoryInterface } from '../../../repositories/user.repository';
import { checkUser } from './services/checkUser.service';
import { getAverage } from './services/getAverage.service';
import { getStatus, Status } from './services/getStatus.service';

interface ServiceOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
}

interface ServiceResponse {
  average: number;
  status: Status;
}

export const service = async ({
  userId,
  userRepository,
}: ServiceOptions): Promise<ServiceResponse> => {
  const user = await userRepository.getOne(userId);
  checkUser(user);
  console.log(user);
  const stringNotes = user?.notes as string[] | undefined;
  const notes = stringNotes ? stringNotes.map((note: string) => parseFloat(note)) : [];

  const average = getAverage(notes);
  return { average, status: getStatus(average) };
};
