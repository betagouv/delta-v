import React, { Fragment } from 'react';

import cs from 'classnames';
import Link from 'next/link';

import { ProgressLinkType } from '@/templates/DeclarationSteps';

export interface IProgressBarAgentProps {
  links: ProgressLinkType[];
  stepNumber: number;
}

export interface IProgressLinkProps {
  link: ProgressLinkType;
  isActive?: boolean;
  isFutureStep?: boolean;
}

const ProgressLink: React.FC<IProgressLinkProps> = ({ link, isActive, isFutureStep }) => {
  return (
    <div className="flex flex-col items-center">
      {isActive && (
        <>
          <p className="text-[8px] font-light text-indigo-600">{`Étape ${link.step}`}</p>
          <Link href={link.to}>
            <div className="flex max-w-[72px] flex-col items-center rounded-[20px] bg-primary-100 p-2 text-primary-600">
              <div className="flex flex-col items-center rounded-lg bg-white px-3 py-2 shadow-lg">
                {link.step}
              </div>
              <p className="mt-1 text-center text-[10px] font-[550] leading-[12px]">{link.name}</p>
            </div>
          </Link>
        </>
      )}
      {!isActive && !isFutureStep && (
        <>
          <p className="text-[8px] font-light text-green-400">{`Étape ${link.step}`}</p>
          <Link href={link.to}>
            <div className="flex flex-col items-center rounded-[20px] py-1">
              <div className="flex flex-col items-center rounded-lg bg-green-100 px-3 py-2 text-green-400 shadow-lg">
                {link.step}
              </div>
            </div>
          </Link>
        </>
      )}
      {!isActive && isFutureStep && (
        <>
          <div className="flex flex-col items-center">
            <p className="text-[8px] font-light text-gray-400">{`Étape ${link.step}`}</p>
            <div className="flex flex-col items-center rounded-[20px] py-2">
              <div className="flex flex-col items-center rounded-lg bg-gray-100 px-3 py-2 text-gray-400">
                {link.step}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const RenderProgress = (link: ProgressLinkType, isActive: boolean, isFutureStep: boolean) => {
  return (
    <Fragment key={link.name}>
      {link.step > 1 && (
        <div
          key={`progress-bar-${link.step}`}
          className={cs({
            'float-left mt-[43px] h-[2px] w-[100%] flex-1 md:mt-[40px] lg:mt-[45px': true,
            'bg-gradient-to-l from-primary-100 to-green-100': isActive,
            'bg-gray-100': !isActive && isFutureStep,
            'bg-green-100': !isActive && !isFutureStep,
          })}
        />
      )}
      <ProgressLink link={link} isActive={isActive} isFutureStep={isFutureStep} />
    </Fragment>
  );
};

export const ProgressBarAgent: React.FC<IProgressBarAgentProps> = ({
  links,
  stepNumber,
}: IProgressBarAgentProps) => {
  return (
    <nav className="flex flex-row justify-between">
      {links.map((link) => {
        const isFutureStep = link.step > stepNumber;
        const isActive = link.step === stepNumber;
        return RenderProgress(link, isActive, isFutureStep);
      })}
    </nav>
  );
};
