import { ReactNode } from 'react';

import classNames from 'classnames';
import { UseFormHandleSubmit } from 'react-hook-form';

import { Main } from './Main';
import { Meta } from '@/layout/Meta';

type IMainProps = {
  children: ReactNode;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
  simpleBg?: boolean;
  linkButton?: string;
};

export type ProgressBarAgentItemType = {
  name: string;
  to: string;
  stepNumber: number;
};

const DeclarationSteps = ({ children, handleSubmit, onSubmit, linkButton }: IMainProps) => {
  return (
    <Main
      meta={
        <Meta
          title="Declaration Déclare Douanes"
          description="Déclaration de douane en quelques clics"
        />
      }
      withHeader
      withTitle
      titleValue={
        <>
          Déclarer
          <br />
          mes achats
        </>
      }
      titleIcon="douanier"
      method="declaration"
      linkButton={linkButton}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classNames({
          'flex flex-1 flex-col h-full': true,
        })}
      >
        {children}
      </form>
    </Main>
  );
};

export { DeclarationSteps };
