import { ReactNode } from 'react';

import classNames from 'classnames';
import { UseFormHandleSubmit } from 'react-hook-form';

import { Main } from './Main';
import { Meta } from '@/layout/Meta';

type IMainProps = {
  children: ReactNode;
  handleSubmit?: UseFormHandleSubmit<any>;
  onSubmit?: (data: any) => void;
  simpleBg?: boolean;
  linkButton?: string;
  onClickBack?: () => void;
};

const DeclarationSteps = ({
  children,
  handleSubmit,
  onSubmit,
  linkButton,
  onClickBack,
}: IMainProps) => {
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
      onClickBack={onClickBack}
    >
      {handleSubmit && onSubmit && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classNames({
            'flex flex-1 flex-col h-full': true,
          })}
        >
          {children}
        </form>
      )}
      {(!handleSubmit || !onSubmit) && (
        <div
          className={classNames({
            'flex flex-1 flex-col h-full': true,
          })}
        >
          {children}
        </div>
      )}
    </Main>
  );
};

export { DeclarationSteps };
