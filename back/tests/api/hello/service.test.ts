import { v4 as uuidv4 } from 'uuid';
import service from '../../../src/api/hello/service';
import { ITestEntity } from '../../../src/entities/test.entity';
import testRepositoryMock from '../../mocks/test.repository.mock';

describe('test hello service', () => {
  it('should return uuid', async () => {
    const test: ITestEntity = {
      id: uuidv4(),
    };

    const testRepository = testRepositoryMock(test);

    const id = await service(testRepository);

    expect(id).toEqual(test.id);
  });
});
