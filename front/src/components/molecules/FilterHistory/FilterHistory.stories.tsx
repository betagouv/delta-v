import { Meta } from '@storybook/react';

import { FilterHistory, FilterHistoryProps } from './FilterHistory';
import { FilterHistoryItem, FilterHistoryItemProps } from './FilterHistoryItem';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

export default {
  title: 'Components/Molecules/FilterHistoryItem',
  component: FilterHistoryItem,
} as Meta;

const FILTER_HISTORY_ITEM_DATA: FilterHistoryItemProps = {
  title: 'Voiture, scooter',
  startDate: 'Du 24/07/2025',
  endDate: ' au 23/05/2026,',
  status: DeclarationStatus.LITIGATION,
  to: 'http://www.google.fr',
};

const FILTER_HISTORY_DATA: FilterHistoryProps = {
  histories: [FILTER_HISTORY_ITEM_DATA, FILTER_HISTORY_ITEM_DATA],
};

export const FilterHistoryItemExemple = (): JSX.Element => (
  <FilterHistoryItem
    title={FILTER_HISTORY_ITEM_DATA.title}
    startDate={FILTER_HISTORY_ITEM_DATA.startDate}
    endDate={FILTER_HISTORY_ITEM_DATA.endDate}
    status={FILTER_HISTORY_ITEM_DATA.status}
    to={FILTER_HISTORY_ITEM_DATA.to}
  />
);

export const FilterHistoryExemple = (): JSX.Element => (
  <FilterHistory histories={FILTER_HISTORY_DATA.histories} />
);
