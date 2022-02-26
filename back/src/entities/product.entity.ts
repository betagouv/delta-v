import { Column, Entity, PrimaryColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

export interface Product {
  id: string;
  parentProductId?: string;
  name: string;
  info?: string;
  childrenQuestion?: string;
  subProducts?: ProductEntity[];
  parentProduct?: ProductEntity;
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

  @Column({ type: 'text', nullable: true })
  info?: string;

  @Column({ type: 'text', nullable: true })
  childrenQuestion?: string;

  @TreeChildren()
  subProducts?: Product[];

  @TreeParent()
  parentProduct?: Product;
}
