import { RegisterOptions, useFormContext } from 'react-hook-form';

import { InputGroup } from '../../helper/InputGroup';
import { IconButtonWithTitle } from '@/components/atoms/IconButtonWithTitle';
import clsxm from '@/utils/clsxm';

export type TextAreaProps = {
  label?: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  readOnly?: boolean;
  clearable?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'textarea'>;

export const TextArea = ({
  label,
  placeholder = '',
  helperText,
  clearable = false,
  id,
  readOnly = false,
  validation,
  ...rest
}: TextAreaProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const formError = errors[id];

  const currentWatchValue = watch(id);

  const clearTextArea = () => {
    setValue(id, '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <InputGroup
      id={id}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
    >
      {currentWatchValue && !readOnly && clearable && (
        <IconButtonWithTitle title="Effacer" onClick={clearTextArea} icon="close" />
      )}
      <textarea
        {...register(id, validation)}
        rows={3}
        {...rest}
        name={id}
        id={id}
        readOnly={readOnly}
        className={clsxm(
          formError && ['error'],
          'text-primary-700 border-4 border-gray-200/70',
          clearable && 'pt-8',
        )}
        placeholder={placeholder}
        aria-describedby={id}
      />
    </InputGroup>
  );
};
