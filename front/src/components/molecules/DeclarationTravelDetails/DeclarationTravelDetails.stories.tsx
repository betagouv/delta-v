import { Meta, StoryObj } from '@storybook/react';

import {
  DeclarationTravelDetails,
  DeclarationTravelDetailsProps,
} from './DeclarationTravelDetails';

const meta: Meta<typeof DeclarationTravelDetails> = {
  title: 'Components/Molecules/DeclarationTravelDetails',
  component: DeclarationTravelDetails,
};

export default meta;
type Story = StoryObj<typeof DeclarationTravelDetails>;

const DECLARATION_CARD_DATA: DeclarationTravelDetailsProps = {
  country: 'France',
  transport: 'luggages' as any,
  journeyId: '123',
};

export const Playground: Story = {
  args: {
    ...DECLARATION_CARD_DATA,
  },
};

export const Base = () => (
  <div>
    <DeclarationTravelDetails {...DECLARATION_CARD_DATA} />
  </div>
);
