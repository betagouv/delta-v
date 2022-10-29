import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export interface Currency {
  id: string;
  name: string;
  value: number;
  updateDate: Date;
  comment?: string;
}

@Entity('currency')
export class CurrencyEntity implements Currency {
  @PrimaryColumn({ type: 'char', length: 3 })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;
}
