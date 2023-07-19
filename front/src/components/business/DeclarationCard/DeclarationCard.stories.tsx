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
  id: 'eca48f46-548c-4e87-87cc-564fe01de67d',
  publicId: '458YT56PM00',
  onClick: () => console.log('click'),
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
  <div className="flex flex-col gap-5">
    <DeclarationCard {...DECLARATION_CARD_DATA} />
    <DeclarationCard {...DECLARATION_CARD_DATA} verificationButton={false} />
  </div>
);
