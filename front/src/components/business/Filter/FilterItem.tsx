import React, { useState } from 'react';

import cs from 'classnames';

import { Icon } from '@/components/common/Icon';

export type FilterItemProps = {
  title: string;
  isActive?: boolean;
  onClick?: (isActive: boolean) => void;
};

export const FilterItem = ({
  title,
  isActive: initialIsActive = false,
  onClick,
}: FilterItemProps) => {
  const [isActive, setIsActive] = useState(initialIsActive);

  const handleClick = () => {
    setIsActive(!isActive);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onClick && onClick(!isActive);
  };

  return (
    <a
      href="#"
      className={cs(
        'h-[22px] w-fit grid grid-cols-[14px_1fr] rounded-full items-center pl-[4px] pr-[7px] border border-[#5A7BF0]',
        isActive && 'bg-[#5A7BF0] text-white',
      )}
      onClick={handleClick}
    >
      <div
        className={cs(
          'h-[14px] w-[14px] rounded-full z-10 flex justify-center items-center text-[30px]',
          [isActive && 'text-[#5A7BF0] bg-white', !isActive && 'bg-[#5A7BF0] text-white'],
        )}
      >
        <Icon name="plus" size="xs" />
      </div>
      <span
        className={cs('text-[10px] ml-[5px]', [
          !isActive && 'text-[#233BBD]',
          isActive && 'text-white',
        ])}
      >
        {title}
      </span>
    </a>
  );
};
