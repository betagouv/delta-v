import { EntityRepository, Repository } from 'typeorm';
import TestEntity, { ITestEntity } from '../entities/test.entity';

export interface ITestRepository {
  getFirst(): Promise<ITestEntity | undefined>;
}

@EntityRepository(TestEntity)
export default class TestRepository extends Repository<TestEntity> implements ITestRepository {
  getFirst(): Promise<ITestEntity | undefined> {
    return this.findOne();
  }
}
