import { Column, Entity, PrimaryColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

export interface Product {
  id: string;
  parentProductId?: string;
  name: string;
  icon?: string;
  finalProduct: boolean;
  productDisplayTypes: ProductDisplayTypes;
  radioValue?: string;
  info?: string;
  childrenQuestion?: string;
  nomenclatures?: string[];
  customDuty?: number;
  vat?: number;
  subProducts?: ProductEntity[];
  parentProduct?: ProductEntity;
  relatedWords: string[];
}

export enum ProductDisplayTypes {
  category = 'category',
  notManaged = 'not-managed',
  addable = 'addable',
  radio = 'radio',
  radioCard = 'radio-card',
}

@Entity('product')
@Tree('closure-table')
export class ProductEntity implements Product {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid', nullable: true })
  parentProductId?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  icon?: string;

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

  @TreeChildren()
  subProducts?: Product[];

  @TreeParent()
  parentProduct?: Product;
}
