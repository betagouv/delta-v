import * as React from 'react';

import { InputGroupLabel } from '../InputGroupLabel';
import clsxm from '@/utils/clsxm';

export type InputGroupFooterProps = { error?: string; helperText?: string };

export type InputGroupProps = {
  id: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  tooltipMessage?: string;
  preventFocusOnLabelClick?: boolean;
};

const InputGroupFooter = ({ helperText, error }: InputGroupFooterProps) => {
  return (
    <div className="mt-1">
      {helperText && <p className="text-xs text-slate-500">{helperText}</p>}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

const InputGroupComponent = ({
  id,
  label,
  helperText,
  error,
  children,
  required,
  fullWidth,
  tooltipMessage,
  preventFocusOnLabelClick,
}: InputGroupProps) => {
  return (
    <div className={clsxm({ 'w-full': fullWidth })}>
      {label && (
        <InputGroupLabel
          id={id}
          label={label}
          required={required}
          tooltipMessage={tooltipMessage}
          preventFocusOnLabelClick={preventFocusOnLabelClick}
        />
      )}
      <div className="relative">{children}</div>
      <InputGroupFooter helperText={helperText} error={error} />
    </div>
  );
};

InputGroupComponent.displayName = 'InputGroup';
InputGroupFooter.displayName = 'InputGroup.Footer';

export default Object.assign(InputGroupComponent, {
  Footer: InputGroupFooter,
  Label: InputGroupLabel,
});
