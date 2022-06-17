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
}

export const Radio: React.FC<IRadioOptions> = ({ radioValues, register, name }) => {
  return (
    <div className="flex items-center space-y-0 space-x-6">
      {radioValues.map((radioValue, index) => (
        <div key={index} className="flex items-center">
          <input
            data-testid="radio-element"
            name={name}
            id={index.toString()}
            value={radioValue.id}
            type="radio"
            className="h-6 w-6 border-black text-primary-600 focus:ring-transparent disabled:text-disabled-text"
            {...register}
          />
          <label
            htmlFor={index.toString()}
            className="ml-2 block text-base text-black disabled:text-disabled-text"
          >
            {radioValue.value}
          </label>
        </div>
      ))}
    </div>
  );
};
