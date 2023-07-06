import { useState } from 'react';

import dayjs from 'dayjs';

import { UseActualityParams, useActualities } from '@/api/hooks/useAPIActualities';
import { ActualityResponse } from '@/api/lib/actualities';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { ActualityCard } from '@/components/business/ActualityCard';
import { FilterBar, FilterBarForm } from '@/components/business/FilterGroup/FilterBar';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { Constants } from '@/utils/enums';

const ActualitiesPage = () => {
  const [page, setPage] = useState<number>(0);
  const [actualities, setActualities] = useState<ActualityResponse[]>([]);
  const [openFilterBar, setOpenFilterBar] = useState(false);

  const addActualities = (apiActualitiesData: ActualityResponse[]): void => {
    const tmpActualities = [...actualities, ...apiActualitiesData];
    const uniqueArray = tmpActualities.filter(
      (v, i, a) => a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i,
    );
    setActualities(uniqueArray);
  };

  const [queryData, setQueryData] = useState<UseActualityParams>({
    search: null,
    limit: Constants.MINI_TABLE_LIMIT,
    offset: page * Constants.MINI_TABLE_LIMIT,
    onSuccess: (data) => addActualities(data),
  });

  const { isLoading, data: apiActualities } = useActualities(queryData);

  const onValidateFilter = (data: FilterBarForm) => {
    setPage(0);
    setQueryData({
      ...queryData,
      search: data.search,
      offset: 0 * Constants.MINI_TABLE_LIMIT,
      tags: data.newsTags && data.newsTags.length > 0 ? data.newsTags.join(',') : undefined,
      startDate: data.startDate ?? undefined,
      endDate: data.endDate ? dayjs(data.endDate).add(1, 'day').toDate() : undefined,
      onSuccess: (dataSuccess) => setActualities(dataSuccess),
    });
  };

  const newLimit = () => {
    if (!apiActualities || apiActualities.length === 0) {
      return;
    }

    if (apiActualities.length < Constants.MINI_TABLE_LIMIT) {
      return;
    }

    setPage(page + 1);
    setQueryData({
      ...queryData,
      offset: (page + 1) * Constants.MINI_TABLE_LIMIT,
      onSuccess: (data) => addActualities(data),
    });
  };

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withTitle
        titleHeader="Actualités"
      >
        <div className="flex flex-col px-4 pb-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="mb-5">
                <FilterBar
                  title="Actualités"
                  searchType="global"
                  onValidateFilter={onValidateFilter}
                  open={openFilterBar}
                  setOpen={setOpenFilterBar}
                  withNewsTagsFilter
                />
              </div>
              <div className="flex flex-col gap-2.5">
                {actualities &&
                  !openFilterBar &&
                  actualities?.map((actuality, index) => (
                    <ActualityCard
                      key={actuality.id}
                      {...actuality}
                      creationDate={actuality.creationDate}
                      content={actuality.content}
                      tags={actuality.tags}
                      newLimit={apiActualities && apiActualities.length ? newLimit : undefined}
                      isLast={index === actualities.length - 1}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </MainAgent>
    </AgentRoute>
  );
};

export default ActualitiesPage;
