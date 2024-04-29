import * as React from 'react';

import { RegisterOptions } from 'react-hook-form';

import { useFormContextOrFallBack } from '../../core/Form/useFormContextOrFallBack';
import InputGroup from '@/components/forms/core/InputGroup';
import InputGroupHorizontal from '@/components/forms/core/InputGroupHorizontal';

export type CheckboxProps = {
  horizontal?: boolean;
  /** Input label */
  label?: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Select (can be set from React Hook Form) */
  checked?: boolean;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Default inputOptions like onChange, value, onBlur... : NOT needed if in RHF */
  inputOptions?: RegisterOptions;
  onChange?: (e?: React.MouseEvent<HTMLInputElement>) => void;
  tooltipMessage?: string;
};

export const Checkbox = ({
  horizontal,
  label,
  helperText,
  id,
  readOnly = false,
  checked = false,
  inputOptions,
  onChange,
  tooltipMessage,
}: CheckboxProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContextOrFallBack();

  const formError = errors[id];

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  return (
    <Group
      id={id}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
      center
      tooltipMessage={tooltipMessage}
    >
      <input
        data-testid={`input-${id}`}
        {...register(id, inputOptions)}
        type="checkbox"
        name={id}
        id={id}
        readOnly={readOnly}
        disabled={readOnly}
        onChange={() => onChange && onChange()}
        aria-describedby={id}
        checked={checked}
      />
    </Group>
  );
};
