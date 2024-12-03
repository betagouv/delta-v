import { useState } from 'react';

import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';

import { UseActualityParams, useActualities } from '@/api/hooks/useAPIActualities';
import { ActualityResponse } from '@/api/lib/actualities';
import { ActualityCard } from '@/components/molecules/ActualityCard';
import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { FilterBarDesktop } from '@/components/organisms/FilterGroup/FilterBarDesktop';
import { FilterBarMobile } from '@/components/organisms/FilterGroup/FilterBarMobile';
import { FilterBarForm } from '@/components/organisms/FilterGroup/types';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { Constants } from '@/utils/enums';

const ActualitiesPage = () => {
  const [page, setPage] = useState<number>(0);
  const [actualities, setActualities] = useState<ActualityResponse[]>([]);
  const [openFilterBar, setOpenFilterBar] = useState(false);
  const [counter, setCounter] = useState<number>(0);

  const addActualities = (apiActualitiesData: ActualityResponse[]): void => {
    const tmpActualities = [...actualities, ...apiActualitiesData];
    const uniqueArray = tmpActualities.filter(
      (v, i, a) => a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i,
    );
    setActualities(uniqueArray);
  };

  const getFiltersCount = (data: FilterBarForm) => {
    let filtersCount = 0;
    if (data.search && data.search !== '') {
      filtersCount += 1;
    }
    if (data.startDate || data.endDate) {
      filtersCount += 1;
    }
    if (data.meanOfTransport && data.meanOfTransport.length > 0) {
      filtersCount += data.meanOfTransport.length;
    }
    if (data.status && data.status.length > 0) {
      filtersCount += data.status.length;
    }
    if (data.newsTags && data.newsTags.length > 0) {
      filtersCount += data.newsTags.length;
    }
    return filtersCount;
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

  const [filterBarData, setFilterBarData] = useState<FilterBarForm>({
    search: '',
    startDate: null,
    endDate: null,
  });

  const onValidateFilter = (data: FilterBarForm) => {
    setFilterBarData(data);
    setPage(0);
    setQueryData({
      ...queryData,
      search: data.search,
      offset: 0 * Constants.MINI_TABLE_LIMIT,
      startDate: data.startDate ?? undefined,
      endDate: data.endDate ? dayjs(data.endDate).add(1, 'day').toDate() : undefined,
      tags: data.newsTags && data.newsTags.length > 0 ? data.newsTags.join(',') : undefined,
      onSuccess: (dataSuccess) => setActualities(dataSuccess),
    });
    setCounter(getFiltersCount(data));
  };

  const { isLoading, data: apiActualities } = useActualities(queryData);

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
        {isMobile ? (
          <div className="mb-5 px-4">
            <FilterBarMobile
              title="Plus de filtres"
              searchType="global"
              onValidateFilter={onValidateFilter}
              open={openFilterBar}
              setOpen={setOpenFilterBar}
              withNewsTagsFilter
              filtersCount={counter}
            />
          </div>
        ) : (
          <FilterBarDesktop
            onSubmit={onValidateFilter}
            filterBarData={filterBarData}
            withNewsTagsFilter
          />
        )}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-[30px] max-w-7xl px-4 pb-4 md:px-0 md:pb-0 md:pt-10">
          {actualities &&
            actualities?.map((actuality, index) => (
              <ActualityCard
                key={actuality.id}
                {...actuality}
                creationDate={actuality.creationDate}
                content={actuality.content}
                tags={actuality.tags}
                newLimit={apiActualities && apiActualities.length ? newLimit : undefined}
                isLast={index === actualities.length - 1}
                width={!isMobile ? 304 : undefined}
              />
            ))}
        </div>
        {isLoading && <div>Chargement...</div>}
      </MainAgent>
    </AgentRoute>
  );
};

export default ActualitiesPage;
