import React, { useState } from 'react';

import classNames from 'classnames';

import { Icon } from '@/components/common/Icon';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';

interface CategoryFilterButtonProps {
  onClick?: (isOpen: boolean) => void;
}

export const CategoryFilterButton = ({ onClick }: CategoryFilterButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClick = () => {
    if (onClick) {
      setIsOpen(!isOpen);
      onClick(isOpen);
    }
  };
  return (
    <div
      className={classNames({
        'h-full flex items-center px-5 rounded-full bg-white gap-11': true,
        'cursor-pointer': onClick,
      })}
      onClick={handleOnClick}
    >
      <div className="flex items-center gap-[10px]">
        <SvgIcon name="filter" className="h-3 w-3" />
        <Typography color="black" weight="bold" size="text-2xs">
          Filtrer par catégories
        </Typography>
      </div>
      <span
        className={classNames({
          'rotate-180 transition-all': isOpen,
          'rotate-0 transition-all': !isOpen,
        })}
      >
        <Icon name="chevron-down" size="sm" />
      </span>
    </div>
  );
};
