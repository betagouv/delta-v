import { Meta, StoryObj } from '@storybook/react';

import {
  DeclarationStatusDetails,
  DeclarationStatusDetailsProps,
} from './DeclarationStatusDetails';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

const meta: Meta<typeof DeclarationStatusDetails> = {
  title: 'Components/Molecules/DeclarationStatusDetails',
  component: DeclarationStatusDetails,
};

export default meta;
type Story = StoryObj<typeof DeclarationStatusDetails>;

const DECLARATION_CARD_DATA: DeclarationStatusDetailsProps = {
  status: DeclarationStatus.ERROR,
  date: new Date(),
  declarationId: '123',
};

export const Playground: Story = {
  args: {
    ...DECLARATION_CARD_DATA,
  },
};

export const Base = () => (
  <div>
    <DeclarationStatusDetails {...DECLARATION_CARD_DATA} />
  </div>
);
