import React, { useEffect } from 'react';

import classNames from 'classnames';
import { getEmojiFlag } from 'countries-list';
import { motion } from 'framer-motion';
import { Alpha2Code, getNames } from 'i18n-iso-countries';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { twMerge } from 'tailwind-merge';
import shallow from 'zustand/shallow';

import CenterModal from '@/components/common/CenterModal';
import DownModal from '@/components/common/DownModal';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { useStore } from '@/stores/store';
import { countriesAlternatives, disabledCountries } from '@/utils/const';
import { memoizedCountriesOptions } from '@/utils/country.util';
import { TailwindDefaultScreenSize } from '@/utils/enums';

interface FormCountryData {
  country?: Alpha2Code;
}

export const ModalSelectCountry: React.FC = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });
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

  const ModalComponent = isMobile ? DownModal : CenterModal;

  return (
    <>
      <div
        className="flex flex-row gap-[10px] items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Typography color="black" size="2xs" weight="bold">
          {selectedCountry}
        </Typography>
        <Icon name="chevron-down" size="lg" />
      </div>

      <ModalComponent bgColor="bg-white" open={open} onClose={() => setOpen(false)} centeredContent>
        <motion.div
          className={twMerge(
            classNames({
              'mx-auto flex flex-col h-auto': true,
              'mb-[10px] mt-[30px] w-[250px] gap-5 ': isMobile,
              'px-[76px] gap-4': !isMobile,
            }),
          )}
        >
          <Typography
            color="black"
            size={isMobile ? 'text-xs' : 'text-2xs'}
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
