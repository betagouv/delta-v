import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface News {
  id: string;
  title: string;
  content: string;
  creationDate: Date;
  tags: string[];
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
  tags: string[];
}
