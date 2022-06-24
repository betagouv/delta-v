import { useState } from 'react';

import { useController, UseFormRegisterReturn } from 'react-hook-form';

import { RadioCardElement } from './RadioCardElement';
import { SvgNames } from '@/components/common/SvgIcon';

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
  onChange?: () => void;
}

export const RadioCard: React.FC<IRadioOptions> = ({ radioCardValues, control, name, rules }) => {
  const [card, setCard] = useState<IRadioCardType>();
  const { field } = useController({
    control,
    name,
    rules,
  });

  return (
    <div data-testid="radio-cards-element" className="mt-2 flex">
      <div className="flex flex-row flex-wrap content-center justify-center gap-5">
        {radioCardValues.map((radioCardValue) => (
          <RadioCardElement
            key={radioCardValue.id}
            svgIcon={radioCardValue.svgIcon}
            value={radioCardValue.value}
            disabled={radioCardValue.disabled}
            checked={card?.id === radioCardValue.id}
            onClick={() => {
              setCard(radioCardValue);
              field.onChange(radioCardValue.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};
