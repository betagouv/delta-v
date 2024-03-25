import { useState } from 'react';

import { SelectCountry } from './SelectCountry';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { MemoizedCountry } from '@/utils/country.util';

export interface SelectCountryPopupProps {
  countries: MemoizedCountry[];
  selectName: string;
  popupTitle: string;
  buttonLabel: string;
  onSelect?: (selectedCountry: MemoizedCountry) => void;
}

export const SelectCountryPopup: React.FC<SelectCountryPopupProps> = ({
  countries,
  selectName,
  popupTitle,
  buttonLabel,
  onSelect,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<MemoizedCountry | null>(null);

  const handleSelect = () => {
    if (onSelect && selectedCountry) {
      onSelect(selectedCountry);
    }
  };

  return (
    <div className="h-screen w-screen bg-black/50">
      <div className="absolute bottom-0 flex h-2/5 w-full flex-col gap-7 rounded-t-3xl bg-white p-5">
        <div className="flex gap-5">
          <div className=" flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-300">
            <Icon name="chevron-left" size="base" />
          </div>
          <Typography color="black" size="text-xl">
            {popupTitle}
          </Typography>
        </div>
        <SelectCountry
          countries={countries}
          selectName={selectName}
          onChange={(e) =>
            setSelectedCountry(countries.find((c) => c.id === e.target.value) || null)
          }
        />
        <div className="flex justify-center">
          <Button onClick={handleSelect}>{buttonLabel}</Button>
        </div>
      </div>
    </div>
  );
};
