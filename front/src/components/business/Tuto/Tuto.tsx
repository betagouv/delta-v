import React from 'react';

import { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { useStore } from '@/stores/store';
import { Routing } from '@/utils/const';

interface TutoProps {
  image: StaticImageData;
  title: React.ReactNode;
  children: React.ReactNode;
  lastOne?: boolean;
}

export const Tuto: React.FC<TutoProps> = ({
  image,
  title,
  children,
  lastOne = false,
}: TutoProps) => {
  const router = useRouter();
  const { hideTuto } = useStore((state) => ({
    hideTuto: state.hideTuto,
  }));

  const leaveTuto = () => {
    hideTuto();
    router.push(Routing.home);
  };
  return (
    <>
      <div className="flex flex-row">
        <span className="flex-1" />
        <div onClick={leaveTuto}>
          {lastOne ? (
            <Icon name="clear" size="lg" />
          ) : (
            <Typography tag="div" color="secondary">
              Ignorer <Icon name="chevron-right" size="lg" />
            </Typography>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-[250px] items-center text-center">
        <div className="mt-6 flex flex-col items-center text-center">
          <div className="h-52 w-52 ">
            <img src={image.src} height={image.height} width={image.width} />
          </div>
        </div>
        <Typography size="text-xl" weight="bold">
          {title}
        </Typography>
        {children}
        <div className="flex-1" />
      </div>
    </>
  );
};
