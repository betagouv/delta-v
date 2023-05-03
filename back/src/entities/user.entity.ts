import { Column, Entity, Index, PrimaryColumn, Unique } from 'typeorm';

export interface User {
  id: string;
  email: string;
  password: string;
  enabled?: boolean;
  blocked?: boolean;
}

@Entity('user')
@Unique(['email'])
export default class UserEntity implements User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  @Index()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  enabled?: boolean;

  @Column({ default: false })
  blocked?: boolean;
}
