import { Meta, Story } from '@storybook/react';

import { FilterHistoryItemProps } from '../FilterHistory';
import { FilterBar, FilterBarProps } from './FilterBar';
import { FilterGroup, FilterGroupProps } from './FilterGroup';
import { FilterItem } from './FilterItem';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

export default {
  title: 'Components/Business/FilterGroup',
  component: FilterGroup,
} as Meta;

const FILTER_HISTORY_ITEM_DATA: FilterHistoryItemProps = {
  title: 'Voiture, scooter',
  startDate: 'Du 24/07/2025',
  endDate: ' au 23/05/2026,',
  status: DeclarationStatus.LITIGATION,
  to: 'http://www.google.fr',
};

const FILTER_DATA: FilterGroupProps = {
  title: 'Statut de la quittance :',
  filters: [
    {
      title: 'Payée',
    },
    {
      title: 'En attente de paiement',
    },
    {
      title: 'Annulée',
    },
  ],
};

const FILTER_BAR_DATA: FilterBarProps = {
  title: 'Plus de filtres',
  searchType: 'actuality',
  filterGroups: [FILTER_DATA, FILTER_DATA, FILTER_DATA],
  filterHistories: [FILTER_HISTORY_ITEM_DATA, FILTER_HISTORY_ITEM_DATA, FILTER_HISTORY_ITEM_DATA],
};

export const Playground: Story<FilterGroupProps> = (args) => (
  <FilterGroup title={args.title} filters={args.filters} />
);

Playground.args = {
  title: FILTER_DATA.title,
  filters: FILTER_DATA.filters,
};

export const FilterBarExample = (): JSX.Element => (
  <FilterBar
    title={FILTER_BAR_DATA.title}
    searchType={FILTER_BAR_DATA.searchType}
    filterGroups={FILTER_BAR_DATA.filterGroups}
    filterHistories={FILTER_BAR_DATA.filterHistories}
  />
);

export const FilterGroupExample = (): JSX.Element => (
  <FilterGroup title={FILTER_DATA.title} filters={FILTER_DATA.filters} />
);

export const FilterItemExample = (): JSX.Element => (
  <div>
    <FilterItem title="Filtre actif" isActive />
    <br />
    <FilterItem title="Filtre inactif" />
  </div>
);
