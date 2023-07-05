import axios from 'axios';

export type GetActualitiesOptions = {
  limit?: number;
  offset?: number;
  search: string | null;
  tags?: string;
  startDate?: Date;
  endDate?: Date;
};

export type ActualityResponse = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  creationDate: Date;
};

export const getActuality = async (id: string): Promise<ActualityResponse> => {
  const { data } = await axios.get<{ actuality: ActualityResponse }>(`/actuality/${id}/`);
  return data.actuality;
};

export const getActualities = async ({
  limit,
  offset,
  search,
  tags,
  startDate,
  endDate,
}: GetActualitiesOptions): Promise<ActualityResponse[]> => {
  console.log('🚀 ~ HGFKHFGKHFKHF:');
  const { data } = await axios.get(`/actuality/`, {
    params: {
      limit: limit as number,
      offset: offset as number,
      tags,
      search,
      startDate,
      endDate,
    },
  });
  console.log('fin', data);

  return data.actualities;
};
