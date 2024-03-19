import { useState } from 'react';

import { useRouter } from 'next/router';

import { useActualities } from '@/api/hooks/useAPIActualities';
import { useDeclarations } from '@/api/hooks/useAPIDeclaration';
import { BlockActualities } from '@/components/common/BlockActualities';
import { BlockHeaderAgent } from '@/components/common/BlockHeaderAgent';
import { BlockHistoricDeclarations } from '@/components/common/BlockHistoricDeclarations';
import { NavBar } from '@/components/common/NavBar';
import { MAIN_MENU_AGENT_ITEMS } from '@/utils/const';
import { DeclarationStatus } from '@/utils/declarationStatus.util';
import { Constants } from '@/utils/enums';

const HomepageAgentDesktop = () => {
  const router = useRouter();
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
        <div className="container flex flex-col px-20 pb-10  gap-[14px]">
          <NavBar links={MAIN_MENU_AGENT_ITEMS} />
          <BlockHeaderAgent
            onChangeSearch={onChangeSearch}
            onSearchAll={onSearchAll}
            searchValue={searchValue}
          />
        </div>
      </div>
      <div className="container flex flex-col  mt-10 pl-[125px] pr-[103px] gap-[50px] pb-[70px]">
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
    </>
  );
};

export { HomepageAgentDesktop };
