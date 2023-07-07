import { NewsEntity } from '../../../entities/news.entity';

export interface SerializedGetOneActuality {
  actualities: NewsEntity[];
}

export default (actualities: NewsEntity[]): SerializedGetOneActuality => ({
  actualities,
});
