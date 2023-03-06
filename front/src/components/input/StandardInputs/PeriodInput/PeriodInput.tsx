import React from 'react';

export interface IPeriodInputOptions {
  register?: any;
  startDateInputId?: string;
  endDateInputId?: string;
}

export const PeriodInput: React.FC<IPeriodInputOptions> = ({
  register,
  startDateInputId,
  endDateInputId,
}: IPeriodInputOptions) => (
  <>
    <div className="flex flex-row overflow-hidden rounded-full">
      <input
        type="date"
        className="flex-1 justify-center rounded-l-full border-2 border-r"
        placeholder="Du: jj/mm/aaaa"
        {...register(startDateInputId, { valueAsDate: true })}
      />
      <input
        type="date"
        className="flex-1 rounded-r-full border-2 border-l border-secondary-500"
        placeholder="Au: jj/mm/aaaa"
        {...register(endDateInputId, { valueAsDate: true })}
      />
    </div>
  </>
);

export default PeriodInput;
