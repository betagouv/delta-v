import React from 'react';

import type { Alpha2Code } from 'i18n-iso-countries';

import { SelectCountrySchema } from './schema';
import { memoizedCountriesData } from './utils';
import { Form } from '@/components/forms/core/Form';
import { AutocompleteInput } from '@/components/forms/custom/AutocompleteInput';
import { Suggestion } from '@/components/forms/custom/AutocompleteInput/utils';
import { countriesAlternatives, disabledCountries } from '@/utils/const';

interface FormSelectCountryProps {
  onSelectCountry: (country: Alpha2Code) => void;
  defaultCountry?: Alpha2Code;
}

export const FormSelectCountry = ({ onSelectCountry, defaultCountry }: FormSelectCountryProps) => {
  const countriesData = memoizedCountriesData({ countriesAlternatives, disabledCountries });
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
          options={countriesData}
          labelId="countryName"
          valueId="countryCode"
          disableClickOnDisabledItem
          required
          placeholder="Saisissez le pays recherché"
          className="min-w-[250px]"
          defaultItemId={defaultCountry}
          favoriteItemIds={['DZ', 'ES', 'VN']}
          onItemClick={onSubmit}
          defaultItemHelperText="Par défaut"
          favoritesTitle="Pays les plus utilisés"
        />
      )}
    />
  );
};
