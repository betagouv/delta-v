import { ITestRepository } from '../../repositories/test.repository';

export default async (testRepository: ITestRepository): Promise<string | undefined> => {
  const test = await testRepository.getFirst();

  return test?.id;
};
