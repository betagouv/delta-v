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
    if (onClick) {
      onClick(!isActive);
    }
  };

  return (
    <div
      className={cs({
        'h-6 w-fit grid grid-cols-[14px_1fr] rounded-full items-center pl-1 pr-2 border border-[#5A7BF0] cursor-pointer':
          true,
        'bg-[#5A7BF0] text-white': isActive,
      })}
      onClick={handleClick}
    >
      <div
        className={cs({
          'h-3.5 w-3.5 rounded-full z-10 flex justify-center items-center': true,
          'text-[#5A7BF0] bg-white': isActive,
          'bg-[#5A7BF0] text-white': !isActive,
        })}
      >
        <Icon name="plus" size="xs" />
      </div>
      <span
        className={cs({
          'text-xs ml-1': true,
          'text-[#233BBD]': !isActive,
          'text-white': isActive,
        })}
      >
        {title}
      </span>
    </div>
  );
};
