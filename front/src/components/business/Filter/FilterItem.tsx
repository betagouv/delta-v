import React from 'react';

import cs from 'classnames';

export type FilterItemProps = {
  title: string;
  isActive?: boolean;
  onClick?: (isActive: boolean) => void;
};

export const FilterItem = ({ title, isActive }: FilterItemProps) => {
  return (
    <div
      className={cs(
        'h-[40px] w-fit grid grid-cols-[40px_1fr] rounded-full items-center pl-[6px] pr-[12px]',
        [isActive && 'bg-[#5A7BF0] text-white', !isActive && 'border-2 border-[#5A7BF0]'],
      )}
    >
      <div
        className={cs(
          'h-[25px] w-[25px] rounded-full z-10 flex justify-center items-center text-[30px]',
          [isActive && 'text-[#5A7BF0] bg-white', !isActive && 'bg-[#5A7BF0] text-white'],
        )}
      >
        {/* Centrer le + */}+
      </div>
      <span className={cs([!isActive && 'text-[#5A7BF0]', isActive && 'text-white'])}>{title}</span>
    </div>
  );
};
