import { Meta } from '@storybook/react';

import { NomenclatureCard } from './NomenclatureCard';
import { productFactory } from '@/tests/factories/Product.factory';

const product = productFactory({ icon: 'categoryCigar' });

const meta: Meta<typeof NomenclatureCard> = {
  title: 'Components/Business/NomenclatureCard',
  component: NomenclatureCard,
};

export default meta;

export const Base = () => (
  <div>
    <NomenclatureCard product={product} />
  </div>
);
