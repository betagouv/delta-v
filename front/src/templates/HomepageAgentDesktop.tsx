import { useState } from 'react';

import { useRouter } from 'next/router';

import { useActualities } from '@/api/hooks/useAPIActualities';
import { useDeclarations } from '@/api/hooks/useAPIDeclaration';
import { NavBar } from '@/components/molecules/NavBar';
import { BlockActualities } from '@/components/organisms/BlockActualities';
import { BlockHeaderAgent } from '@/components/organisms/BlockHeaderAgent';
import { BlockHistoricDeclarations } from '@/components/organisms/BlockHistoricDeclarations';
import { MAIN_MENU_AGENT_ITEMS } from '@/utils/const';
import { DeclarationStatus } from '@/utils/declarationStatus.util';
import { Constants } from '@/utils/enums';

const HomepageAgentDesktop = () => {
  const router = useRouter();
  const path = router.pathname;
  const [searchValue, setSearchValue] = useState<string>('');

  const basedDeclarationQueryData = {
    search: null,
    searchPublicId: null,
    limit: Constants.SEE_MORE_DECLARATION,
    status: DeclarationStatus.PAID,
    offset: 0,
  };

  const { isLoading: isActualitiesLoading, data: apiActualities } = useActualities({
    search: null,
    limit: Constants.SEE_MORE_LIMIT,
    offset: 0,
  });

  const { isLoading: isSubmittedDeclarationsLoading, data: apiSubmittedDeclarations } =
    useDeclarations({
      ...basedDeclarationQueryData,
      status: DeclarationStatus.SUBMITTED,
    });
  const { isLoading: isPaidDeclarationsLoading, data: apiPaidDeclarations } = useDeclarations({
    ...basedDeclarationQueryData,
    status: DeclarationStatus.PAID,
  });
  const { isLoading: isErrorDeclarationsLoading, data: apiErrorDeclarations } = useDeclarations({
    ...basedDeclarationQueryData,
    status: `${DeclarationStatus.LITIGATION},${DeclarationStatus.ERROR}`,
  });

  const onSearchAll = (value: string) => {
    router.push({
      pathname: '/agent/declaration',
      query: { search: value },
    });
  };

  const onChangeSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <div className="bg-navbar-bg">
        <div className="flex place-content-center">
          <NavBar links={MAIN_MENU_AGENT_ITEMS} activePath={path} />
        </div>
        <div className="mx-auto flex flex-col pb-10 gap-[14px]">
          <BlockHeaderAgent
            onChangeSearch={onChangeSearch}
            onSearchAll={onSearchAll}
            searchValue={searchValue}
          />
        </div>
      </div>
      <div className="container flex mt-10 pb-[70px]">
        <div className="mx-auto flex flex-col gap-[50px] px-10">
          <BlockHistoricDeclarations
            errorDeclarations={apiErrorDeclarations}
            paidDeclarations={apiPaidDeclarations}
            submittedDeclarations={apiSubmittedDeclarations}
            isPaidDeclarationsLoading={isPaidDeclarationsLoading}
            isSubmittedDeclarationsLoading={isSubmittedDeclarationsLoading}
            isErrorDeclarationsLoading={isErrorDeclarationsLoading}
          />
          <BlockActualities actualities={apiActualities} isLoading={isActualitiesLoading} />
        </div>
      </div>
    </>
  );
};

export { HomepageAgentDesktop };
