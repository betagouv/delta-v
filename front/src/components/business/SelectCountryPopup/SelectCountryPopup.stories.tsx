import { faker } from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import { Alpha2Code } from 'i18n-iso-countries';

import { SelectCountry, SelectCountryProps } from './SelectCountry';
import { SelectCountryPopup, SelectCountryPopupProps } from './SelectCountryPopup';

export default {
  title: 'Components/Business/SelectCountryPopup',
  component: SelectCountry,
} as Meta;

export const Playground: Story<SelectCountryPopupProps> = (args) => (
  <SelectCountryPopup {...args} />
);

const SELECT_COUNTRY_DATA: SelectCountryProps = {
  countries: [
    { id: 1, countryCode: faker.address.countryCode() as Alpha2Code },
    { id: 2, countryCode: faker.address.countryCode() as Alpha2Code },
    { id: 3, countryCode: faker.address.countryCode() as Alpha2Code },
    { id: 4, countryCode: faker.address.countryCode() as Alpha2Code },
    { id: 5, countryCode: faker.address.countryCode() as Alpha2Code },
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
