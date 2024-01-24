import React from 'react';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';

export type FilterBarDesktopProps = {
  children?: React.ReactNode;
  handleSubmit: any;
  onSubmit: any;
};

export const FilterBarDesktop = ({ children, handleSubmit, onSubmit }: FilterBarDesktopProps) => {
  return (
    <div className="flex flex-col rounded-xl bg-gray-100 p-5 max-w-[781px] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center gap-4">{children}</div>
          </div>
          <div className="flex flex-col gap-8 pt-[3px]">
            <button
              type="submit"
              className="flex flex-row gap-5 bg-primary-600 rounded-full text-white items-center justify-center px-5 py-2.5 h-[34px]"
            >
              <Typography size="text-2xs" color="white">
                Rechercher
              </Typography>
              <Icon name="search" size="sm" color="white" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
