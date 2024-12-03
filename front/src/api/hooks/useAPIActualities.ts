import { useQuery } from 'react-query';

import { ActualityResponse, getActualities, getActuality } from '../lib/actualities';

export type UseActualityParams = {
  limit?: number;
  offset?: number;
  search: string | null;
  tags?: string;
  startDate?: Date;
  endDate?: Date;
  onSuccess?: (data: ActualityResponse[]) => void;
};

export const useActualities = ({
  limit,
  offset,
  search,
  startDate,
  endDate,
  tags,
  onSuccess,
}: UseActualityParams) => {
  return useQuery(
    ['actuality', limit, offset, search, startDate, endDate, tags],
    () =>
      getActualities({
        limit,
        offset,
        search,
        startDate,
        endDate,
        tags,
      }),
    {
      onSuccess(data: ActualityResponse[]) {
        if (onSuccess) {
          onSuccess(data);
        }
      },
    },
  );
};

// QUERY
export const useActuality = (id: string) => useQuery(['actuality', { id }], () => getActuality(id));
