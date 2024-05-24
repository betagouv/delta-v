import React from 'react';

import cs from 'classnames';

import { TitleAgent } from '../TitleAgent';
import { BackButton } from '@/components/molecules/BackButton';
import clsxm from '@/utils/clsxm';

export interface TitleHeaderProps {
  title: string;
  bgColorClass?: string;
  switchWordPosition?: number;
  colorClassnameOne?: string;
  colorClassnameTwo?: string;
  href?: string;
  titleWidthClassname?: `w-${string}`;
  onReturnClick?: () => void;
}

export const TitleHeaderAgent: React.FC<TitleHeaderProps> = ({
  title,
  bgColorClass,
  switchWordPosition,
  colorClassnameOne,
  colorClassnameTwo,
  href,
  titleWidthClassname = 'w-[270px]',
  onReturnClick,
}: TitleHeaderProps) => {
  return (
    <div
      className={cs(
        'grid grid-cols-[40px_1fr_40px] w-full flex-row min-h-[64px] pt-4 z-50',
        bgColorClass,
      )}
    >
      <BackButton href={href} onReturnClick={onReturnClick} />
      <div className={clsxm('flex w-full justify-center place-self-center', titleWidthClassname)}>
        <TitleAgent
          title={title}
          switchWordPosition={switchWordPosition}
          colorClassnameOne={colorClassnameOne}
          colorClassnameTwo={colorClassnameTwo}
        />
      </div>
    </div>
  );
};
