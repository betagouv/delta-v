import { Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Product, ProductEntity } from './product.entity';
import UserEntity, { User } from './user.entity';

export interface SearchProductHistory {
  productId: string;
  userId: string;
  searchDate: Date;
}

export interface SearchProductHistoryEntityInterface extends SearchProductHistory {
  product: Product;
  user: User;
}

@Entity('search_product_history')
export class SearchProductHistoryEntity implements SearchProductHistory {
  @PrimaryColumn({ type: 'uuid' })
  productId: string;

  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  searchDate: Date;

  @ManyToOne(() => ProductEntity)
  @JoinColumn()
  product?: ProductEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user?: UserEntity;
}
