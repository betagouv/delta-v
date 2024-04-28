/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';

import { useFormContext } from 'react-hook-form';

import { Icon } from '@/components/atoms/Icon';
import { IconButtonWithTitle } from '@/components/atoms/IconButtonWithTitle';

export type InputGroupProps = {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  clearableArea?: boolean;
  onClear?: () => void;
  noErrorIcon?: boolean;
  children: React.ReactNode;
};

const InputGroupComponent = ({
  id,
  label,
  clearableArea,
  helperText,
  onClear,
  noErrorIcon,
  error,
  children,
}: InputGroupProps) => {
  const { watch, setValue } = useFormContext();
  const value = watch(id);

  const handleClearClick = () => {
    setValue(id, '');
    if (onClear) {
      onClear();
    }
  };

  return (
    <>
      {label && <InputGroupLabel id={id} label={label} />}
      <div className="relative mt-1">
        {children}

        {!noErrorIcon && error && (
          <div className="pointer-events-none absolute right-2 top-2 flex items-center">
            <Icon name="close" />
          </div>
        )}
        {value && clearableArea && (
          <IconButtonWithTitle onClick={handleClearClick} icon="clear" title="Effacer" />
        )}
      </div>
      <InputGroupFooter helperText={helperText} error={error} />
    </>
  );
};

const InputGroupFooter = ({ helperText, error }: { error?: string; helperText?: string }) => {
  return (
    <div className="mt-1">
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

const InputGroupLabel = ({ label, id }: { label: string; id: string }) => {
  return (
    <label htmlFor={id} className="block text-sm font-normal text-primary-500">
      {label}
    </label>
  );
};

InputGroupComponent.displayName = 'InputGroup';
InputGroupFooter.displayName = 'InputGroup.Footer';
InputGroupLabel.displayName = 'InputGroup.Label';

export const InputGroup = Object.assign(InputGroupComponent, {
  Footer: InputGroupFooter,
  Label: InputGroupLabel,
});
