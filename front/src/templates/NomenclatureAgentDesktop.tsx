import { useRouter } from 'next/router';

import { ProductSearchBarDesktop } from '@/components/business/ProductSearchBar/desktop';
import { NavBar } from '@/components/common/NavBar';
import { Typography } from '@/components/common/Typography';
import { MAIN_MENU_AGENT_ITEMS } from '@/utils/const';

const NomenclatureAgentDesktop = () => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      <div className="flex flex-col pl-[103px] pr-20 gap-[14px] border-b">
        <NavBar links={MAIN_MENU_AGENT_ITEMS} activePath={path} />
      </div>
      <div className="flex flex-col px-[126px] pt-[60px] gap-[30px]">
        <Typography size="text-3xl">Nomenclature</Typography>
        <ProductSearchBarDesktop />
      </div>
    </>
  );
};

export { NomenclatureAgentDesktop };
