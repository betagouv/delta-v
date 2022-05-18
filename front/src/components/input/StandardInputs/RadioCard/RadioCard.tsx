import { useState } from 'react';

import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';
import { useController, UseFormRegisterReturn } from 'react-hook-form';

import { SvgIcon, SvgNames } from '@/components/common/SvgIcon';

export interface IRadioCardType {
  id: string;
  value: string;
  disabled?: boolean;
  svgIcon: SvgNames;
}

export interface IRadioOptions {
  id?: string;
  name: string;
  disabled?: boolean;
  error?: string;
  radioCardValues: IRadioCardType[];
  register?: UseFormRegisterReturn;
  control: any;
  rules?: any;
}

export const RadioCard: React.FC<IRadioOptions> = ({ radioCardValues, control, name, rules }) => {
  const [card, setCard] = useState();

  const { field } = useController({
    control,
    name,
    rules,
  });

  return (
    <RadioGroup
      data-testid="radio-card-element"
      {...field}
      value={card}
      onChange={(e: any) => {
        field.onChange(e?.id);
        setCard(e);
      }}
      className="mt-2 flex"
    >
      <div className="flex flex-row flex-wrap content-center justify-center gap-5">
        {radioCardValues.map((radioCardValue) => (
          <RadioGroup.Option
            disabled={radioCardValue.disabled}
            key={radioCardValue.id}
            value={radioCardValue}
            className={({ checked, disabled }) =>
              classNames(
                disabled ? 'opacity-50' : '',
                checked ? 'font-extrabold border-2' : 'font-ligh border hover:bg-gray-50',
                'border-gray-200 rounded-xl py-[18px] h-[88px] w-[85px] flex items-center justify-center text-sm sm:flex-1',
              )
            }
          >
            <div className="flex flex-col">
              <div className="h-8">
                <SvgIcon name={radioCardValue.svgIcon} />
              </div>
              <RadioGroup.Label as="p" className="text-center">
                {radioCardValue.value}
              </RadioGroup.Label>
            </div>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};
