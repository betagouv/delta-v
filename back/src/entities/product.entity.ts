import { Column, Entity, PrimaryColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

export interface IProduct {
  id: string;
  parentProductId?: string;
  name: string;
  info?: string;
  childrenQuestion?: string;
}

export interface IProductEntity extends IProduct {
  subProducts?: IProductEntity[];
  parentProduct?: IProductEntity;
}

@Entity('product')
@Tree('closure-table')
export default class ProductEntity implements IProductEntity {
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
  subProducts?: IProductEntity[];

  @TreeParent()
  parentProduct?: IProductEntity;
}
