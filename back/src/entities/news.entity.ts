import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum NewsTags {
  NOMENCLATURE = 'nomenclature',
  TAXES = 'taxes',
  LEGAL = 'legal',
}

export interface News {
  id: string;
  title: string;
  content: string;
  creationDate: Date;
  tags: NewsTags[];
}

@Entity('news')
export class NewsEntity implements News {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp' })
  creationDate: Date;

  @Column({ type: 'simple-array', default: '' })
  tags: NewsTags[];
}
