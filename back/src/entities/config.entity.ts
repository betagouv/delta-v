import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import type { Alpha2Code } from 'i18n-iso-countries';
import UserEntity, { UserEntityInterface } from './user.entity';

export interface Config {
  userId: string;
  defaultCountry: Alpha2Code | null;
}

export interface ConfigEntityInterface extends Config {
  user?: UserEntityInterface;
}

@Entity('config')
export class ConfigEntity implements ConfigEntityInterface {
  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  defaultCountry: Alpha2Code | null;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user?: UserEntityInterface;
}
