import { Meta } from '@storybook/react';

import { FilterHistoryItemProps } from '../../molecules/FilterHistory';
import { FilterBarActualityDesktop } from './FilterBarActuality';
import { FilterGroup } from './FilterGroup';
import { FilterItem } from './FilterItem';
import { FilterBarProps } from './types';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

export default {
  title: 'Components/Organisms/FilterGroup',
  component: FilterGroup,
} as Meta;

const FILTER_HISTORY_ITEM_DATA: FilterHistoryItemProps = {
  title: 'Voiture, scooter',
  startDate: 'Du 24/07/2025',
  endDate: ' au 23/05/2026,',
  status: DeclarationStatus.LITIGATION,
  to: 'http://www.google.fr',
};

const FILTER_BAR_DATA: FilterBarProps = {
  title: 'Plus de filtres',
  searchType: 'actuality',
  filterHistories: [FILTER_HISTORY_ITEM_DATA, FILTER_HISTORY_ITEM_DATA, FILTER_HISTORY_ITEM_DATA],
  onValidateFilter: (data) => console.log(data),
  open: true,
  setOpen: () => console.log('open'),
};

export const FilterBarActualityExample = (): JSX.Element => (
  <FilterBarActualityDesktop
    title={FILTER_BAR_DATA.title}
    searchType={FILTER_BAR_DATA.searchType}
    filterHistories={FILTER_BAR_DATA.filterHistories}
    onValidateFilter={FILTER_BAR_DATA.onValidateFilter}
    open={FILTER_BAR_DATA.open}
    setOpen={FILTER_BAR_DATA.setOpen}
  />
);

export const FilterGroupExample = (): JSX.Element => {
  return (
    <FilterGroup
      filters={[
        {
          id: '1',
          value: 'Filtre actif',
        },
        {
          id: '2',
          value: 'Filtre inactif',
        },
      ]}
      title="Filtres"
      name="filter"
    />
  );
};

export const FilterItemExample = (): JSX.Element => (
  <div>
    <FilterItem
      filter={{
        id: '1',
        value: 'Filtre actif',
      }}
      isActive
      onClick={() => console.log('click')}
    />
    <br />
    <FilterItem
      filter={{
        id: '2',
        value: 'Filtre inactif',
      }}
      isActive={false}
      onClick={() => console.log('click')}
    />
  </div>
);
