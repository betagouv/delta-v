import { Meta, StoryObj } from '@storybook/react';

import { DeclarationCard, DeclarationCardProps } from './DeclarationCard';
import { MeansOfTransport } from '@/stores/simulator/appState.store';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

const meta: Meta<typeof DeclarationCard> = {
  title: 'Components/Business/DeclarationCard',
  component: DeclarationCard,
};

export default meta;
type Story = StoryObj<typeof DeclarationCard>;

const DECLARATION_CARD_DATA: DeclarationCardProps = {
  id: '458YT56PM00',
  date: new Date(),
  lastName: 'DOE',
  firstName: 'John',
  transport: MeansOfTransport.PLANE,
  status: DeclarationStatus.PAID,
  verificationButton: true,
  verificationLink: 'http://www.google.fr',
};

export const Playground: Story = {
  args: {
    ...DECLARATION_CARD_DATA,
  },
};

export const Base = () => (
  <div>
    <DeclarationCard {...DECLARATION_CARD_DATA} />
  </div>
);
