import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface IRadioType {
  id: string;
  value: string;
}

export interface IRadioOptions {
  id?: string;
  name: string;
  disabled?: boolean;
  error?: string;
  radioValues: IRadioType[];
  register?: UseFormRegisterReturn;
  control?: any;
  rules?: any;
  newRadio?: boolean;
}

export const Radio: React.FC<IRadioOptions> = ({
  radioValues,
  register,
  name,
  error,
  newRadio = false,
  disabled = false,
}) => {
  return (
    <div className="flex items-center space-y-0 space-x-6">
      {radioValues.map((radioValue, index) => (
        <div key={`${radioValue.id}-${index}`} className="flex items-center space-x-3">
          <input
            data-testid="radio-element"
            disabled={disabled}
            name={name}
            id={`${radioValue.id}-${index}`}
            value={radioValue.id}
            type="radio"
            className={classNames({
              'form-radio h-5 w-5 border-gray-300 text-primary-600 focus:ring-transparent disabled:text-disabled-text':
                true,
              'border-error': newRadio && error,
            })}
            {...register}
          />
          <label
            htmlFor={`${radioValue.id}-${index}`}
            className={classNames({
              'ml-2.5 block text-base text-black disabled:text-disabled-text': true,
              'text-error': newRadio && error,
            })}
          >
            {radioValue.value}
          </label>
        </div>
      ))}
    </div>
  );
};
