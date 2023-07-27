import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { AmountProduct } from '../api/common/services/amountProducts/globalAmount.service';
import { FavoriteEntity, FavoriteEntityInterface } from './favorite.entity';

export interface Product {
  id: string;
  name: string;
  positionRank: string;
  icon?: string;
  info?: string;
  nomenclatures?: string[];
  relatedWords: string[];

  parentProductId?: string;
  subProducts?: ProductEntity[];
  parentProduct?: ProductEntity;

  productType: ProductType;
  amountProduct?: AmountProduct;
  countries: string[];

  finalProduct: boolean;
  productDisplayTypes: ProductDisplayTypes;
  radioValue?: string;
  childrenQuestion?: string;

  customDuty?: number;
  vat?: number;
}

export enum ProductDisplayTypes {
  category = 'category',
  notManaged = 'not-managed',
  addable = 'addable',
  radio = 'radio',
  radioCard = 'radio-card',
}

export enum ProductType {
  amount = 'amount',
  value = 'value',
}

export interface ProductEntityInterface extends Product {
  favorites?: FavoriteEntity[];
}

@Entity('product')
@Tree('closure-table')
export class ProductEntity implements ProductEntityInterface {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({ type: 'uuid', nullable: true })
  parentProductId?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  positionRank: string;

  @Column({ type: 'varchar', nullable: true })
  icon?: string;

  @Column({ type: 'enum', nullable: false, default: ProductType.value, enum: ProductType })
  productType: ProductType;

  @Column({ type: 'varchar', nullable: true })
  amountProduct?: AmountProduct;

  @Column({ type: 'boolean', default: false })
  finalProduct: boolean;

  @Column({ type: 'enum', default: ProductDisplayTypes.category, enum: ProductDisplayTypes })
  productDisplayTypes: ProductDisplayTypes;

  @Column({ type: 'text', nullable: true })
  radioValue?: string;

  @Column({ type: 'text', nullable: true })
  info?: string;

  @Column({ type: 'text', nullable: true })
  childrenQuestion?: string;

  @Column({ type: 'simple-array', nullable: true })
  nomenclatures?: string[];

  @Column({ type: 'float', nullable: true })
  customDuty?: number;

  @Column({ type: 'float', nullable: true })
  vat?: number;

  @Column({ type: 'simple-array', default: '' })
  relatedWords: string[];

  @Column({ type: 'simple-array', default: '' })
  countries: string[];

  @TreeChildren()
  subProducts?: Product[];

  @TreeParent()
  parentProduct?: Product;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
  @JoinColumn()
  favorites?: FavoriteEntityInterface[];
}
