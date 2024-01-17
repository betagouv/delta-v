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
  console.log('apiErrorDeclarations', apiErrorDeclarations);
  console.log('apiPaidDeclarations', apiPaidDeclarations);
  console.log('apiSubmittedDeclarations', apiSubmittedDeclarations);
  console.log('apiActualities', apiActualities);

  return (
    <>
      <div className="flex flex-col pl-[103px] pr-20 pb-10 bg-navbar-bg gap-[14px]">
        <NavBar links={MAIN_MENU_AGENT_ITEMS} />
        <BlockHeaderAgent
          onChangeSearch={onChangeSearch}
          onSearchAll={onSearchAll}
          searchValue={searchValue}
        />
      </div>
      <div className="flex flex-col  mt-10 px-[126px] gap-[50px] pb-[104px]">
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
