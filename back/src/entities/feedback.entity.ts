import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface Feedback {
  id: string;
  userId?: string;
  comment: string;
  email?: string;
  pictureUrl?: string | null;
}

@Entity('feedback')
export class FeedbackEntity implements Feedback {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid', nullable: true })
  userId?: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @Column({ type: 'varchar', nullable: true })
  pictureUrl?: string | null;
}
