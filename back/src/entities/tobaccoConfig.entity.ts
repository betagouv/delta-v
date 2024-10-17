import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity, ProductEntityInterface } from './product.entity';

export interface TobaccoConfig {
  id: string;
  productId: string;
  referencePrice: number;
  taxCategoryRate: number;
  taxCategoryPrice: number;
}

export interface TobaccoConfigEntityInterface extends TobaccoConfig {
  product?: ProductEntityInterface;
}

@Entity('tobacco_config')
export class TobaccoConfigEntity implements TobaccoConfigEntityInterface {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'real' })
  referencePrice: number;

  @Column({ type: 'real' })
  taxCategoryRate: number;

  @Column({ type: 'real' })
  taxCategoryPrice: number;

  @OneToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product?: ProductEntityInterface;
}
