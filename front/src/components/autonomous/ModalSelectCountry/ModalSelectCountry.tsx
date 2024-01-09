import React, { useEffect } from 'react';

import { getEmojiFlag } from 'countries-list';
import { motion } from 'framer-motion';
import { Alpha2Code, getNames } from 'i18n-iso-countries';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import DownModal from '@/components/common/DownModal';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { useStore } from '@/stores/store';
import { countriesAlternatives, disabledCountries } from '@/utils/const';
import { memoizedCountriesOptions } from '@/utils/country.util';

interface ModalSelectCountryProps {}

interface FormCountryData {
  country?: Alpha2Code;
}

export const ModalSelectCountry: React.FC<ModalSelectCountryProps> = () => {
  const {
    setProductsNomenclatureToDisplay,
    setCountryForProductsNomenclature,
    countryForProductsNomenclature,
  } = useStore(
    (state) => ({
      setProductsNomenclatureToDisplay: state.setProductsNomenclatureToDisplay,
      setCountryForProductsNomenclature: state.setCountryForProductsNomenclature,
      countryForProductsNomenclature: state.products.appState.countryForProductsNomenclature,
    }),
    shallow,
  );

  const countries = getNames('fr', { select: 'official' });
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<string | undefined>(
    `${countries[countryForProductsNomenclature]} ${getEmojiFlag(
      countryForProductsNomenclature,
    ).toString()}`,
  );

  const { register, control } = useForm<FormCountryData>({
    defaultValues: {},
  });

  useEffect(() => {
    setProductsNomenclatureToDisplay(countryForProductsNomenclature);
  }, []);

  register('country', {
    onChange: (e: any) => {
      const country = `${countries[e.target.value]} ${getEmojiFlag(e.target.value).toString()}`;
      setSelectedCountry(country);
      setCountryForProductsNomenclature(e.target.value);
      setProductsNomenclatureToDisplay(e.target.value);
      setOpen(false);
    },
  });

  const countriesOptions = memoizedCountriesOptions(countriesAlternatives, disabledCountries, true);

  return (
    <>
      <div className="flex flex-row gap-2.5 items-center">
        <Typography color="black" size="2xs" weight="bold" onClick={() => setOpen(true)}>
          {selectedCountry}
        </Typography>
        <Icon name="chevron-down" size="lg" />
      </div>

      <DownModal bgColor="bg-white" open={open} onClose={() => setOpen(false)}>
        <motion.div className="mx-auto mb-2.5 mt-[30px] w-[250px] gap-5 flex flex-col h-auto">
          <Typography color="black" size="xs" weight="bold" textPosition="text-center">
            Sélectionner le pays de provenance :
          </Typography>

          <InputGroup
            type="select"
            options={countriesOptions}
            name="country"
            register={register('country')}
            control={control}
            fullWidth={true}
            placeholder="Pays"
            trailingIcon="chevron-down"
            withBorder
            withListBoxEffect
          />
        </motion.div>
      </DownModal>
    </>
  );
};
