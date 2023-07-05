import { NewsEntity } from '../../../entities/news.entity';
import { SerializedActuality, actualitySerializer } from '../common/serializer/actualitySerializer';

export interface SerializedGetOneActuality {
  actualities: SerializedActuality[];
}

export default (actualities: NewsEntity[]): SerializedGetOneActuality => ({
  actualities: actualities.map(actualitySerializer),
});
