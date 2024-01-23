import { useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';

import { UseActualityParams, useActualities } from '@/api/hooks/useAPIActualities';
import { ActualityResponse } from '@/api/lib/actualities';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { ActualityCard } from '@/components/business/ActualityCard';
import { FilterBarActuality } from '@/components/business/FilterGroup/FilterBarActuality';
import { FilterBarMobile } from '@/components/business/FilterGroup/FilterBarMobile';
import { FilterBarForm } from '@/components/business/FilterGroup/types';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { Constants } from '@/utils/enums';

const ActualitiesPage = () => {
  const [page, setPage] = useState<number>(0);
  const [actualities, setActualities] = useState<ActualityResponse[]>([]);
  const [openFilterBar, setOpenFilterBar] = useState(false);
  const [filterBarData, setFilterBarData] = useState<FilterBarForm>({
    status: [],
    meanOfTransport: [],
    newsTags: [],
    startDate: null,
    endDate: null,
    search: null,
  });

  const addActualities = (apiActualitiesData: ActualityResponse[]): void => {
    const tmpActualities = [...actualities, ...apiActualitiesData];
    const uniqueArray = tmpActualities.filter(
      (v, i, a) => a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i,
    );
    setActualities(uniqueArray);
  };

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const LIMIT = isMobile ? Constants.MINI_TABLE_LIMIT : Constants.LIST_LIMIT;

  const [queryData, setQueryData] = useState<UseActualityParams>({
    search: null,
    limit: LIMIT,
    offset: page * LIMIT,
    onSuccess: (data) => addActualities(data),
  });

  const { isLoading, data: apiActualities } = useActualities(queryData);

  const onValidateFilter = (data: FilterBarForm) => {
    setPage(0);
    setQueryData({
      ...queryData,
      search: data.search,
      offset: 0 * LIMIT,
      tags: data.newsTags && data.newsTags.length > 0 ? data.newsTags.join(',') : undefined,
      startDate: data.startDate ?? undefined,
      endDate: data.endDate ? dayjs(data.endDate).add(1, 'day').toDate() : undefined,
      onSuccess: (dataSuccess) => setActualities(dataSuccess),
    });
    setFilterBarData(data);
  };

  const newLimit = () => {
    if (!apiActualities || apiActualities.length === 0) {
      return;
    }

    if (apiActualities.length < LIMIT) {
      return;
    }

    setPage(page + 1);
    setQueryData({
      ...queryData,
      offset: (page + 1) * LIMIT,
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
        isMobile={isMobile}
        withTitle
        titleHeader="Actualités"
      >
        <div className={classNames({ 'flex flex-col ': true, ' px-4 pb-4': isMobile })}>
          {isLoading ? (
            <div>Chargement...</div>
          ) : (
            <div className="flex flex-col gap-5 md:gap-[30px]">
              {isMobile ? (
                <FilterBarMobile
                  title="Actualités"
                  searchType="global"
                  onValidateFilter={onValidateFilter}
                  open={openFilterBar}
                  setOpen={setOpenFilterBar}
                  withNewsTagsFilter
                  filterBarData={filterBarData}
                />
              ) : (
                <FilterBarActuality
                  title="Actualités"
                  searchType="global"
                  onValidateFilter={onValidateFilter}
                  open={openFilterBar}
                  setOpen={setOpenFilterBar}
                  withNewsTagsFilter
                  filterBarData={filterBarData}
                />
              )}
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-col md:flex-row md:flex-wrap gap-[30px]">
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
              </div>
            </div>
          )}
        </div>
      </MainAgent>
    </AgentRoute>
  );
};

export default ActualitiesPage;
