import { News } from '../../../entities/news.entity';
import { ActualityRepositoryInterface } from '../../../repositories/actuality.repository';

export interface IGetOneActualityServiceOptions {
  limit: number;
  offset: number;
  search?: string;
  searchPublicId?: string;
  tags?: string;
  startDate?: Date;
  endDate?: Date;
  actualityRepository: ActualityRepositoryInterface;
}

export default async ({
  limit,
  offset,
  search,
  tags,
  startDate,
  endDate,
  actualityRepository,
}: IGetOneActualityServiceOptions): Promise<News[]> => {
  const actualities = await actualityRepository.getAll({
    limit,
    offset,
    search,
    tags,
    startDate,
    endDate,
  });

  return actualities;
};
