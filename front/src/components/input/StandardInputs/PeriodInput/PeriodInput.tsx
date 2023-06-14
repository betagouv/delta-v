// import React from 'react';

// export interface IPeriodInputOptions {
//   register?: any;
//   startDateInputId?: string;
//   endDateInputId?: string;
// }

// export const PeriodInput: React.FC<IPeriodInputOptions> = ({
//   register,
//   startDateInputId = 'startDate',
//   endDateInputId = 'endDate',
// }: IPeriodInputOptions) => (
//   <>
//     <div className="flex flex-row overflow-hidden rounded-full">
//       <input
//         type="date"
//         className="flex-1 justify-center rounded-l-full border-2 border-r"
//         placeholder="Du: jj/mm/aaaa"
//         {...register(startDateInputId, { valueAsDate: true })}
//       />
//       <input
//         type="date"
//         className="flex-1 rounded-r-full border-2 border-l border-secondary-500"
//         placeholder="Au: jj/mm/aaaa"
//         {...register(endDateInputId, { valueAsDate: true })}
//       />
//     </div>
//   </>
// );

// export default PeriodInput;

import React from 'react';

import cs from 'classnames';

export interface IPeriodInputOptions {
  register?: any;
  startDateInputId?: string;
  endDateInputId?: string;
  noBorder?: boolean;
}

export const PeriodInput: React.FC<IPeriodInputOptions> = ({
  register,
  startDateInputId = 'startDate',
  endDateInputId = 'endDate',
  noBorder = false,
}: IPeriodInputOptions) => (
  <div className="grid w-full grid-cols-2 gap-[2px] overflow-hidden">
    <input
      type="date"
      className={cs({
        'flex-1 justify-center rounded-l-full border border-secondary-300 placeholder:font-light placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none focus:ring-transparent':
          true,
        'border-none': noBorder,
      })}
      // placeholder="Du: jj/mm/aaaa"
      {...register(startDateInputId, { valueAsDate: true })}
    />
    <input
      type="date"
      className={cs({
        'flex-1 justify-center rounded-r-full border border-secondary-300 focus:ring-transparent':
          true,
        'border-none': noBorder,
      })}
      // placeholder="Au: jj/mm/aaaa"
      {...register(endDateInputId, { valueAsDate: true })}
    />
  </div>
);

export default PeriodInput;
