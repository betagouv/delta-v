import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface User {
  id: string;
  notes: number[];
  ban: boolean;
}

@Entity('user')
export class UserEntity implements User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'simple-array' })
  notes: number[];

  @Column({ type: 'boolean' })
  ban: boolean;
}
