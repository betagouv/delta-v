import * as React from 'react';

import { InputGroupLabel } from '../InputGroupLabel';
import clsxm from '@/utils/clsxm';

export type InputGroupFooterProps = { error?: string; helperText?: string };

export type InputGroupProps = {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  children?: React.ReactNode;
  center?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  tooltipMessage?: string;
  preventFocusOnLabelClick?: boolean;
};

const InputGroupFooter = ({ helperText, error }: InputGroupFooterProps) => {
  return (
    <div className="mt-1">
      {helperText && <p className="text-xs md:hidden text-slate-500">{helperText}</p>}
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
  center,
  required = false,
  fullWidth,
  tooltipMessage,
  preventFocusOnLabelClick,
}: InputGroupProps) => {
  return (
    <div
      className={clsxm({ 'md:flex flex-wrap': true, 'w-full': fullWidth, 'items-center': center })}
    >
      <div className="mr-4 w-56">
        {label && (
          <InputGroupLabel
            id={id}
            label={label}
            required={required}
            tooltipMessage={tooltipMessage}
            preventFocusOnLabelClick={preventFocusOnLabelClick}
          />
        )}
        {helperText && <p className="text-xs max-md:hidden text-slate-500">{helperText}</p>}
      </div>
      <div className=" grow mt-1 md:mt-0">
        <div className="relative">{children}</div>
      </div>
      <div className="w-full md:flex">
        <div className="mr-4 w-56" />
        <InputGroupFooter helperText={helperText} error={error} />
      </div>
    </div>
  );
};

InputGroupComponent.displayName = 'InputGroup';
InputGroupFooter.displayName = 'InputGroup.Footer';

export default Object.assign(InputGroupComponent, {
  Footer: InputGroupFooter,
  Label: InputGroupLabel,
});
