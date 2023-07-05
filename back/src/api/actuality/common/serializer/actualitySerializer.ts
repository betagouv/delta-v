import { News } from '../../../../entities/news.entity';

export interface SerializedActuality {
  id: string;
  title: string;
  content: string;
  creationDate: Date;
  tags: string[];
}

export const actualitySerializer = (actuality: News): SerializedActuality => ({
  id: actuality.id,
  title: actuality.title,
  content: actuality.content,
  creationDate: actuality.creationDate,
  tags: actuality.tags,
});
