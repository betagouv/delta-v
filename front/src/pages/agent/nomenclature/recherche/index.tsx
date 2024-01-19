import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { ModalCategoryNomenclatureProduct } from '@/components/autonomous/ModalCategoryNomenclatureProduct';
import { ModalSelectCountry } from '@/components/autonomous/ModalSelectCountry';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { NomenclatureCard } from '@/components/business/NomenclatureCard';
import { Typography } from '@/components/common/Typography';
import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import { Meta } from '@/layout/Meta';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';
import { getSearchProductResults } from '@/utils/search';

const SearchProduct = () => {
  const { findProduct, searchNomenclatureProducts } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      searchNomenclatureProducts: state.searchNomenclatureProducts,
    }),
    shallow,
  );

  const router = useRouter();

  const { search, selectedId }: { search?: string; selectedId?: string } = router.query;

  const [openCategoryDownModal, setOpenCategoryDownModal] = useState<boolean>(false);
  const [productsThatMatch, setProductsThatMatch] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    if (selectedId) {
      setSelectedProduct(findProduct(selectedId));
      setOpenCategoryDownModal(true);
    }
  }, [selectedId]);

  useEffect(() => {
    setProductsThatMatch(
      getSearchProductResults({
        selectedId,
        search,
        findProduct,
        searchFunction: searchNomenclatureProducts,
      }),
    );
  }, [selectedId, search]);

  const onClickProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenCategoryDownModal(true);
  };

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withTitle
        titleHeader="Recherche"
      >
        <div className="flex flex-1 flex-col border-t border-secondary-300 py-4 mx-5">
          <div className="flex flex-row justify-between items-center">
            <Typography size="text-sm" color="black">
              {`${productsThatMatch.length} résultat${
                productsThatMatch.length > 1 ? 's' : ''
              } pour "${search}"`}
            </Typography>
            <ModalSelectCountry />
          </div>
          <div className="flex flex-1 flex-col gap-4 mt-2">
            {productsThatMatch?.map((product) => (
              <NomenclatureCard
                key={product.id}
                product={product}
                onClick={onClickProduct}
                searchValue={search as string}
              />
            ))}
          </div>
        </div>
        <ModalCategoryNomenclatureProduct
          open={openCategoryDownModal}
          onClose={() => setOpenCategoryDownModal(false)}
          defaultProduct={selectedProduct}
        />
      </MainAgent>
    </AgentRoute>
  );
};
export default declarationAgent(SearchProduct);
