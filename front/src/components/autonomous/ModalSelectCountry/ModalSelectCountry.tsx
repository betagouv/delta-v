import React, { useEffect } from 'react';

import { getEmojiFlag } from 'countries-list';
import { motion } from 'framer-motion';
import { Alpha2Code, getNames } from 'i18n-iso-countries';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { useStore } from '@/stores/store';
import { countriesAlternatives, disabledCountries } from '@/utils/const';
import { memoizedCountriesOptions } from '@/utils/country.util';
import { ModalType, getModalComponent } from '@/utils/modal';

interface ModalSelectCountryProps {}

interface FormCountryData {
  country?: Alpha2Code;
}

interface ModalSelectCountryProps {
  modalType?: ModalType;
}

export const ModalSelectCountry = ({ modalType = ModalType.DOWN }: ModalSelectCountryProps) => {
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
    `${getEmojiFlag(countryForProductsNomenclature).toString()}  ${
      countries[countryForProductsNomenclature]
    } `,
  );

  const { register, control } = useForm<FormCountryData>({
    defaultValues: {},
  });

  useEffect(() => {
    setProductsNomenclatureToDisplay(countryForProductsNomenclature);
  }, []);

  register('country', {
    onChange: (e: any) => {
      const country = `${getEmojiFlag(e.target.value).toString()}  ${countries[e.target.value]}`;
      setSelectedCountry(country);
      setCountryForProductsNomenclature(e.target.value);
      setProductsNomenclatureToDisplay(e.target.value);
      setOpen(false);
    },
  });

  const countriesOptions = memoizedCountriesOptions(countriesAlternatives, disabledCountries, true);

  const ModalComponent = getModalComponent(modalType);

  return (
    <>
      <div
        className="flex flex-row gap-[10px] items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Typography color="black" size="text-2xs" weight="bold" desktopSize="text-sm">
          {selectedCountry}
        </Typography>
        <Icon name="chevron-down" size="lg" />
      </div>

      <ModalComponent bgColor="bg-white" open={open} onClose={() => setOpen(false)}>
        <motion.div className="mx-auto flex flex-col h-auto mb-[10px] mt-[30px] w-[250px] md:w-[264px] gap-5 md:gap-4">
          <Typography
            color="black"
            size="text-xs"
            desktopSize="text-xs"
            weight="bold"
            textPosition="text-center"
          >
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
      </ModalComponent>
    </>
  );
};
