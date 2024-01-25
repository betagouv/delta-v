import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import UserEntity, { UserEntityInterface } from './user.entity';
import { ProductEntity, ProductEntityInterface } from './product.entity';

export interface Favorite {
  userId: string;
  productId: string;
  name: string;
}

export interface FavoriteEntityInterface extends Favorite {
  user?: UserEntityInterface;
  product?: ProductEntityInterface;
}

@Entity('favorite')
export class FavoriteEntity implements FavoriteEntityInterface {
  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @PrimaryColumn({ type: 'uuid' })
  productId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => ProductEntity, (product) => product.favorites, { onDelete: 'CASCADE' })
  @JoinColumn()
  product?: ProductEntityInterface;

  @ManyToOne(() => UserEntity, (user) => user.favorites, { onDelete: 'CASCADE' })
  @JoinColumn()
  user?: UserEntityInterface;
}
