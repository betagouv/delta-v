import { Entity, PrimaryColumn } from 'typeorm';

interface ITestEntity {
  id: string;
}

@Entity('test')
export default class TestEntity implements ITestEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
}
