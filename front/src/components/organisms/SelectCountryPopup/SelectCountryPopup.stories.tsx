import { faker } from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import type { Alpha2Code } from 'i18n-iso-countries';

import { SelectCountry, SelectCountryProps } from './SelectCountry';
import { SelectCountryPopup, SelectCountryPopupProps } from './SelectCountryPopup';

export default {
  title: 'Components/Organisms/SelectCountryPopup',
  component: SelectCountry,
} as Meta;

export const Playground: Story<SelectCountryPopupProps> = (args) => (
  <SelectCountryPopup {...args} />
);

const SELECT_COUNTRY_DATA: SelectCountryProps = {
  countries: [
    { value: '1', id: faker.address.countryCode() as Alpha2Code, alternatives: [] },
    { value: '2', id: faker.address.countryCode() as Alpha2Code, alternatives: [] },
    { value: '3', id: faker.address.countryCode() as Alpha2Code, alternatives: [] },
    { value: '4', id: faker.address.countryCode() as Alpha2Code, alternatives: [] },
    { value: '5', id: faker.address.countryCode() as Alpha2Code, alternatives: [] },
  ],
  selectName: faker.word.noun(),
};

const SELECT_COUNTRY_POPUP_DATA: SelectCountryPopupProps = {
  ...SELECT_COUNTRY_DATA,
  popupTitle: faker.lorem.sentence(5),
  buttonLabel: faker.word.noun(),
  onSelect: (selectedCountry) => selectedCountry,
};

Playground.args = {
  ...SELECT_COUNTRY_DATA,
  popupTitle: faker.lorem.sentence(5),
  buttonLabel: faker.word.noun(),
};

export const SelectCountryComponent = (): JSX.Element => {
  return (
    <div>
      <SelectCountry {...SELECT_COUNTRY_DATA} />
    </div>
  );
};

export const SelectCountryPopupComponent = (): JSX.Element => {
  return (
    <div className="h-screen w-screen">
      <SelectCountryPopup {...SELECT_COUNTRY_POPUP_DATA} />
    </div>
  );
};
