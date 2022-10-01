import { Search } from '@/components/business/search';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const SearchFaq = () => {
  const { searchFaq } = useStore((state) => ({
    searchFaq: state.searchFaq,
  }));

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withTitle
      titleValue="FAQ"
      titleIcon="question"
    >
      <div className="flex flex-1 flex-col gap-6">
        <Search onSearch={searchFaq} searchType="faq" autoFocus withSearchIcon />
      </div>
    </Main>
  );
};
export default simulator(SearchFaq);
