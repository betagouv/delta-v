import { Meta, Story } from '@storybook/react';

import { FilterProps, Filter } from './Filter';
import { FilterItem } from './FilterItem';

export default {
  title: 'Components/Business/Filter',
  component: Filter,
} as Meta;

const FILTER_DATA: FilterProps = {
  title: 'Statut de la quittance',
  filters: ['Payée', 'En attente de paiement', 'Annulée'],
};

export const Playground: Story<FilterProps> = (args) => (
  <Filter title={args.title} filters={args.filters} />
);

Playground.args = {
  title: FILTER_DATA.title,
  filters: FILTER_DATA.filters,
};

export const FilterExample = (): JSX.Element => (
  <div>
    <Filter title={FILTER_DATA.title} filters={FILTER_DATA.filters} />
  </div>
);

export const FilterItemExample = (): JSX.Element => (
  <div>
    <FilterItem title="Filtre actif" isActive />
    <br />
    <FilterItem title="Filtre inactif" />
  </div>
);
