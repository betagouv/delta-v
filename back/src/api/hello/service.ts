import { Repository } from 'typeorm';
import TestEntity from '../../entities/test.entity';

export default async (testRepository: Repository<TestEntity>): Promise<string | undefined> => {
  const test = await testRepository.findOne();
  return test?.id;
};
