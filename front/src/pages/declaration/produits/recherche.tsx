import { Search } from '@/components/business/Search';
import { declaration } from '@/core/hoc/declaration.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const SearchProduct = () => {
  const { searchProducts } = useStore((state) => ({
    searchProducts: state.searchProducts,
  }));

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
      titleIcon="categoryDouanier"
      method="declaration"
    >
      <div className="flex flex-1 flex-col gap-6">
        <Search onSearch={searchProducts} autoFocus withSearchIcon method="declaration" />
      </div>
    </Main>
  );
};
export default declaration(SearchProduct);
