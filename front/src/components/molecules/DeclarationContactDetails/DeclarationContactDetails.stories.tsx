import { Meta, StoryObj } from '@storybook/react';

import {
  DeclarationContactDetails,
  DeclarationContactDetailsProps,
} from './DeclarationContactDetails';

const meta: Meta<typeof DeclarationContactDetails> = {
  title: 'Components/Molecules/DeclarationContactDetails',
  component: DeclarationContactDetails,
};

export default meta;
type Story = StoryObj<typeof DeclarationContactDetails>;

const DECLARATION_CARD_DATA: DeclarationContactDetailsProps = {
  lastName: 'DOE',
  firstName: 'John',
  age: 30,
  phoneNumber: '0123456789',
  email: 'a@b.com',
  address: '12 rue des Champs Elysées',
  postalCode: '75000',
  city: 'Paris',
};

export const Playground: Story = {
  args: {
    ...DECLARATION_CARD_DATA,
  },
};

export const Base = () => (
  <div>
    <DeclarationContactDetails {...DECLARATION_CARD_DATA} />
  </div>
);
