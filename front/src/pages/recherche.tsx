import shallow from 'zustand/shallow';

import { Search } from '@/components/business/search';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';
import { SearchType } from '@/utils/search';

const SearchFaq = () => {
  const { searchFaq, searchProducts } = useStore(
    (state) => ({
      searchFaq: state.searchFaq,
      searchProducts: state.searchProducts,
    }),
    shallow,
  );

  const onSearch = (value: string): SearchType<any>[] => {
    const resultFaq = searchFaq(value);
    const resultProducts = searchProducts(value);

    console.log({ resultFaq });
    console.log({ resultProducts });

    return [...resultFaq, ...resultProducts];
  };

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="-mt-2 -mb-3 flex flex-col items-center">
        <div className="h-6 ">
          <SvgIcon name="logo" />
        </div>
      </div>
      <div className="mb-1 flex flex-col gap-6">
        <div>
          <Typography
            weight="bold"
            variant="h1"
            tag="h1"
            size="text-3xl"
            color="secondary"
            lineHeight="leading-none"
          >
            Bonjour
          </Typography>
          <Typography
            weight="bold"
            variant="h1"
            tag="h1"
            size="text-3xl"
            color="primary"
            lineHeight="leading-none"
          >
            Bienvenue !
          </Typography>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <Search onSearch={onSearch} searchType="global" autoFocus withSearchIcon />
      </div>
    </Main>
  );
};
export default simulator(SearchFaq);
