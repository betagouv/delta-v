import { Meta, Story } from '@storybook/react';

import { FilterProps, Filter } from './Filter';
import { FilterItem, FilterItemProps } from './FilterItem';

export default {
  title: 'Components/Business/Filter',
  component: Filter,
} as Meta;

const FILTER_DATA: FilterProps = {
  title: 'Statut de la quittance',
  filters: ['Payée', 'En attente de paiement', 'Annulée'],
};

const FILTER_ITEM_DATA: FilterItemProps[] = [
  {
    title: 'Payée',
    isActive: true,
  },
  {
    title: 'En attente de paiement',
    isActive: true,
  },
  {
    title: 'Annulée',
    isActive: false,
  },
];

export const Playground: Story = {
  args: {
    title: FILTER_DATA.title,
    filters: FILTER_DATA.filters,
  },
};

export const FilterExample = (): JSX.Element => (
  <div>
    <Filter title={FILTER_DATA.title} filters={FILTER_DATA.filters} />
  </div>
);

export const FilterItemExample = (): JSX.Element => (
  <div>
    {FILTER_ITEM_DATA.map((item, index) => (
      <FilterItem key={index} title={item.title} isActive={item.isActive} />
    ))}
  </div>
);
