import React, { useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { SvgIcon } from '../SvgIcon';
import { Typography } from '../Typography';
import { ModalResumeDeclaration } from '@/components/autonomous/ModalResumeDeclaration';
import { useStore } from '@/stores/store';
import clsxm from '@/utils/clsxm';
import { MenuAgentItem, RoutingAgent } from '@/utils/const';
import { getLevelWithData } from '@/utils/declarationAgent';

interface NavBarProps {
  links: MenuAgentItem[];
  activePath?: string;
}

const getNavBarLink = (item: MenuAgentItem) => {
  if (item.disabled) {
    return '';
  }
  return item.path ?? '';
};

export const NavBar: React.FC<NavBarProps> = ({ links, activePath }: NavBarProps) => {
  const router = useRouter();
  const [openModalResumeDeclaration, setOpenModalResumeDeclaration] = useState<boolean>(false);

  const { declarationAgentRequest } = useStore((state) => ({
    declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
  }));

  const openDeclaration = () => {
    if (getLevelWithData(declarationAgentRequest) === 1) {
      router.push(RoutingAgent.createDeclaration);
    } else {
      setOpenModalResumeDeclaration(true);
    }
  };

  const handleNavbarItemClick = (item: MenuAgentItem) => {
    if (item.openDeclarationResumeModal) {
      openDeclaration();
    } else setOpenModalResumeDeclaration(false);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div
          className="w-[86px] h-[45px] md:hidden lg:flex cursor-pointer"
          onClick={() => router.push(`${RoutingAgent.home}?mode=tools`)}
        >
          <SvgIcon name="logoAgent" />
        </div>
        <div className="flex flex-row gap-[45px] items-center py-7">
          {links.map((item) => {
            return (
              <div key={item.title} className="flex justify-center items-center w-full">
                {item.id === 'declaration' ? (
                  <div
                    className={clsxm({
                      'py-2 px-5 rounded-full bg-primary-400 inline-flex items-center justify-between cursor-pointer':
                        true,
                      'cursor-not-allowed': item.disabled,
                    })}
                    onClick={() => handleNavbarItemClick(item)}
                  >
                    <div className="flex flex-row gap-2.5 items-center">
                      <div className="w-5 h-5 flex items-center justify-items-center">
                        <SvgIcon name={item.svgIcon} />
                      </div>
                      <Typography color={'white'} size="text-2xs" tag="div" noWrap>
                        {item.title}
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <NextLink href={getNavBarLink(item)} key={item.title}>
                    <div
                      className={clsxm({
                        'cursor-pointer': true,
                        'cursor-not-allowed': item.disabled,
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
        </div>
      </div>
      <ModalResumeDeclaration
        open={openModalResumeDeclaration}
        onClose={() => setOpenModalResumeDeclaration(false)}
        templateRole="agent"
      />
    </>
  );
};
