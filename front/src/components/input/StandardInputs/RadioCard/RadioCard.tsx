import { useState } from 'react';

import classNames from 'classnames';
import { useController, UseFormRegisterReturn } from 'react-hook-form';

import { RadioCardElement } from './RadioCardElement';
import { RadioCardMin } from './RadioCardMin';
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
  littleCard?: boolean;
  control: any;
  rules?: any;
  onChange?: () => void;
}

export const RadioCard: React.FC<IRadioOptions> = ({
  radioCardValues,
  control,
  name,
  rules,
  littleCard,
}) => {
  const { field } = useController({
    control,
    name,
    rules,
  });
  const [card, setCard] = useState<IRadioCardType | undefined>(
    radioCardValues.find((radioCard) => radioCard.id === field.value),
  );

  return (
    <div data-testid="radio-cards-element" className="mt-2 flex">
      <div
        className={classNames({
          'flex flex-row flex-wrap': true,
          'justify-start gap-3': littleCard,
          'content-center justify-center gap-5': !littleCard,
        })}
      >
        {radioCardValues.map((radioCardValue) =>
          littleCard ? (
            <RadioCardMin
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
          ) : (
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
          ),
        )}
      </div>
    </div>
  );
};
