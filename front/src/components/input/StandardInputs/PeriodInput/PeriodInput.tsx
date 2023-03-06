import React from 'react';

export interface IPeriodInputOptions {
  register?: any;
}

export const PeriodInput: React.FC<IPeriodInputOptions> = ({ register }: IPeriodInputOptions) => (
  <>
    <div className="flex flex-row overflow-hidden rounded-full">
      <input
        type="date"
        className="flex-1 justify-center rounded-l-full border-2 border-r"
        placeholder="Du: jj/mm/aaaa"
        {...register('startDate', { valueAsDate: true })}
      />
      <input
        type="date"
        className="flex-1 rounded-r-full border-2 border-l border-secondary-500"
        placeholder="Au: jj/mm/aaaa"
        {...register('endDate', { valueAsDate: true })}
      />
    </div>
  </>
);

export default PeriodInput;
