import React from 'react';

import { Alpha2Code } from 'i18n-iso-countries';

import { SelectCountrySchema } from './schema';
import { memoizedCountriesOptions } from './utils';
import { Form } from '@/components/forms/core/Form';
import { AutocompleteInput } from '@/components/forms/custom/AutocompleteInput';
import { Suggestion } from '@/components/forms/custom/AutocompleteInput/utils';
import { countriesAlternatives, disabledCountries } from '@/utils/const';

interface FormSelectCountryProps {
  onSelectCountry: (country: Alpha2Code) => void;
}

export const FormSelectCountry = ({ onSelectCountry }: FormSelectCountryProps) => {
  const countries = memoizedCountriesOptions(countriesAlternatives, disabledCountries);
  const onSubmit = (country: Suggestion) => {
    onSelectCountry(country.value as Alpha2Code);
  };
  return (
    <Form
      data-testid="select-country-form"
      schema={SelectCountrySchema}
      onSubmit={onSubmit}
      render={() => (
        <AutocompleteInput
          options={countries}
          labelId="countryName"
          valueId="countryCode"
          disableClickOnDisabledItem
          required
          placeholder="Saisissez le pays recherché"
          className="min-w-[250px]"
          defaultItemId="DZ"
          favoriteItemIds={['DZ', 'ES', 'VN']}
          onItemClick={onSubmit}
          defaultItemHelperText="Par défaut"
          favoritesTitle="Pays les plus utilisés"
        />
      )}
    />
  );
};
