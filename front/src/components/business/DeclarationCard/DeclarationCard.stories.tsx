import { Meta, StoryObj } from '@storybook/react';

import { DeclarationStatus } from '../DeclarationBadgeStatus';
import { DeclarationCard, DeclarationCardProps } from './DeclarationCard';
import { MeansOfTransport } from '@/stores/simulator/appState.store';

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
  status: DeclarationStatus.SUBMITTED,
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
