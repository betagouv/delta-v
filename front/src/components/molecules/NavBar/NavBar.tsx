import React, { useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { Typography } from '../../atoms/Typography';
import { SvgIcon } from '../SvgIcon';
import { Button } from '@/components/atoms/Button';
import { ModalResumeDeclaration } from '@/components/organisms/ModalResumeDeclaration';
import { useStore } from '@/stores/store';
import clsxm from '@/utils/clsxm';
import { MenuAgentItem, RoutingAgent } from '@/utils/const';
import { checkIsOneOfDeclarationStepsPath, getLevelWithData } from '@/utils/declarationAgent';

interface NavBarProps {
  links: MenuAgentItem[];
  activePath?: string;
  handleLogout: () => void;
}

const getNavBarLink = (item: MenuAgentItem) => {
  if (item.disabled) {
    return '';
  }
  return item.path ?? '';
};

export const NavBar: React.FC<NavBarProps> = ({ links, activePath, handleLogout }: NavBarProps) => {
  const router = useRouter();
  const [openModalResumeDeclaration, setOpenModalResumeDeclaration] = useState<boolean>(false);

  const {
    declarationAgentRequest,
    setCountryForProductsNomenclature,
    countryForProductsNomenclature,
  } = useStore(
    (state) => ({
      declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
      setCountryForProductsNomenclature: state.setCountryForProductsNomenclature,
      countryForProductsNomenclature: state.products.appState.countryForProductsNomenclature,
    }),
    shallow,
  );

  const openDeclaration = () => {
    if (getLevelWithData(declarationAgentRequest) === 1) {
      router.push(RoutingAgent.createDeclaration);
    } else {
      setOpenModalResumeDeclaration(true);
    }
  };

  const handleNavbarItemClick = (item: MenuAgentItem) => {
    if (item.disabled) {
      return;
    }
    if (item.openDeclarationResumeModal) {
      openDeclaration();
    } else setOpenModalResumeDeclaration(false);
    if (countryForProductsNomenclature && activePath !== item.path) {
      setCountryForProductsNomenclature(undefined);
    }
  };

  const isOneOfDeclarationSteps = activePath && checkIsOneOfDeclarationStepsPath(activePath);

  return (
    <div
      className={clsxm({
        'flex items-center mx-auto lg:px-10 px-4 max-w-[1200px] w-full': true,
      })}
    >
      <div
        className="w-[86px] h-[45px] cursor-pointer"
        onClick={() => router.push(`${RoutingAgent.home}?mode=tools`)}
      >
        <SvgIcon name="logoAgent" />
      </div>
      <div className="flex-1" />
      <div className="flex flex-row lg:gap-[45px] gap-5 items-center py-7">
        {links.map((item) => {
          return (
            <div key={item.title} className="flex justify-center items-center w-full">
              {item.id === 'declaration' ? (
                <div
                  className={clsxm({
                    'py-2 px-5 rounded-full bg-primary-400 inline-flex items-center justify-between cursor-pointer hover:opacity-80 active:opacity-0':
                      true,
                    'cursor-default hover:opacity-100 active:opacity-100': isOneOfDeclarationSteps,
                    'cursor-not-allowed hover:opacity-100 active:opacity-100': item.disabled,
                  })}
                  onClick={!isOneOfDeclarationSteps ? () => handleNavbarItemClick(item) : undefined}
                >
                  <div className="flex flex-row gap-2.5 items-center">
                    <div className="w-5 h-5 flex items-center justify-items-center">
                      <SvgIcon name={item.svgIcon} />
                    </div>
                    <Typography
                      color={'white'}
                      size="text-2xs"
                      tag="div"
                      noWrap
                      weight={isOneOfDeclarationSteps ? 'bold' : undefined}
                    >
                      {item.title}
                    </Typography>
                  </div>
                </div>
              ) : (
                <NextLink href={getNavBarLink(item)} key={item.title}>
                  <div
                    className={clsxm({
                      'cursor-default': true,
                      'cursor-pointer hover:opacity-80 active:opacity-0': activePath !== item.path,
                      'cursor-not-allowed hover:opacity-100 active:opacity-100': item.disabled,
                    })}
                    onClick={() => handleNavbarItemClick(item)}
                  >
                    <Typography
                      size="text-2xs"
                      color={item.disabled ? 'light-gray' : 'black'}
                      weight={activePath === item.path ? 'bold' : undefined}
                      noWrap
                    >
                      {item.title}
                    </Typography>
                  </div>
                </NextLink>
              )}
            </div>
          );
        })}

        <Button onClick={handleLogout} icon="logout">
          Déconnexion
        </Button>
      </div>
      <ModalResumeDeclaration
        open={openModalResumeDeclaration}
        onClose={() => setOpenModalResumeDeclaration(false)}
        templateRole="agent"
      />
    </div>
  );
};
