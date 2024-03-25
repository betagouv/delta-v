import { Meta, StoryObj } from '@storybook/react';

import {
  DeclarationJourneyDetails,
  DeclarationJourneyDetailsProps,
} from './DeclarationJourneyDetails';

const meta: Meta<typeof DeclarationJourneyDetails> = {
  title: 'Components/Molecules/DeclarationJourneyDetails',
  component: DeclarationJourneyDetails,
};

export default meta;
type Story = StoryObj<typeof DeclarationJourneyDetails>;

const DECLARATION_CARD_DATA: DeclarationJourneyDetailsProps = {
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
    <DeclarationJourneyDetails {...DECLARATION_CARD_DATA} />
  </div>
);
