import { ITestEntity } from '../../src/entities/test.entity';
import { ITestRepository } from '../../src/repositories/test.repository';

export default (id: ITestEntity): ITestRepository => ({
  getFirst: jest.fn().mockResolvedValue(id),
});
