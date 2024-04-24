import * as React from 'react';
import { TbInfoCircle } from 'react-icons/tb';

import { Tooltip } from '@/components/atoms/Tooltip';

type InputGroupLabelProps = {
  id: string;
  label: string;
  required?: boolean;
  tooltipMessage?: string;
  preventFocusOnLabelClick?: boolean;
};

export const InputGroupLabel = ({ label, id, required, tooltipMessage, preventFocusOnLabelClick = false }: InputGroupLabelProps) => {
  let inputLabel: string | React.ReactNode = label;
  if (required) {
    inputLabel = (
      <>
        {inputLabel} <span className="text-red-500">*</span>
      </>
    );
  }
  if (tooltipMessage) {
    inputLabel = (
      <div className="flex items-center gap-1">
        {inputLabel}
        <Tooltip message={tooltipMessage}>
          <TbInfoCircle />
        </Tooltip>
      </div>
    );
  }
  return (
    <label htmlFor={!preventFocusOnLabelClick ? id : undefined} className="block text-base font-normal text-slate-700">
      {inputLabel}
    </label>
  );
};
