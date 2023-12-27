import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { FavoriteEntity, FavoriteEntityInterface } from './favorite.entity';

export interface User {
  id: string;
  email: string;
  password: string;
  enabled?: boolean;
  blocked?: boolean;
}

export interface UserEntityInterface extends User {
  favorites?: FavoriteEntity[];
}

@Entity('user')
@Unique(['email'])
export default class UserEntity implements UserEntityInterface {
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

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  @JoinColumn()
  favorites?: FavoriteEntityInterface[];
}
