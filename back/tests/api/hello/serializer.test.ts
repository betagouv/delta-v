import { v4 as uuidv4 } from 'uuid';
import serializer from '../../../src/api/hello/serializer';

describe('test hello serializer', () => {
  it('should return hello world with uuid', () => {
    const id = uuidv4();

    const response = serializer(id);

    expect(response.message).toEqual(`Hello World! ${id}`);
  });
});
