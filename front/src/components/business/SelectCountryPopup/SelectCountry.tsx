import { getEmojiFlag } from 'countries-list';
import { getName } from 'i18n-iso-countries';
import { UseFormRegisterReturn } from 'react-hook-form';

import { MemoizedCountry } from '@/utils/country.util';

export interface SelectCountryProps {
  disabled?: boolean;
  countries: MemoizedCountry[];
  error?: string;
  register?: UseFormRegisterReturn;
  control?: any;
  selectName: string;
  fullWidth?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectCountry: React.FC<SelectCountryProps> = ({
  countries,
  disabled,
  error,
  selectName,
  fullWidth,
  register,
}) => {
  let className = `bg-white relative border border-secondary-300 border-solid rounded-full pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 text-base max-w-full`;
  className += fullWidth ? ' w-full' : ' w-auto';
  className += error
    ? ' border-red-500 focus:ring-red-500 focus:border-red-500'
    : ' border-secondary-300 focus:ring-transparent focus:border-primary-600';
  className += disabled ? ' text-disabled-text' : '';

  return (
    <>
      <input
        type="text"
        name={selectName}
        {...register}
        className={className}
        disabled={disabled}
        list="input-list"
      />
      <datalist id="input-list">
        {countries.map((country, index) => (
          <option
            key={index}
            value={`${getEmojiFlag(country.id).toString()} - ${getName(country.id, 'fr')}`}
          />
        ))}
      </datalist>
    </>
  );
};
