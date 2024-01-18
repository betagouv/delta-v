import { useState } from 'react';

import { useRouter } from 'next/router';

import { CategoryProductDesktop } from '@/components/autonomous/CategoryProduct/desktop';
import { ModalSelectCountry } from '@/components/autonomous/ModalSelectCountry';
import { ProductSearchTools } from '@/components/business/ProductSearchTools/desktop';
import { ProductSearchBarStyle } from '@/components/business/ProductSearchTools/enum';
import { NavBar } from '@/components/common/NavBar';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { MAIN_MENU_AGENT_ITEMS } from '@/utils/const';

const NomenclatureAgentDesktop = () => {
  const router = useRouter();
  const path = router.pathname;

  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [showCategoryFilters, setShowCategoryFilters] = useState<boolean>(false);

  const onFavoriteClick = (product: Product) => {
    setCurrentProduct(product);
  };

  const onFilterByCategoryClick = (isOpen: boolean) => {
    setShowCategoryFilters(!isOpen);
  };

  return (
    <>
      <div className="flex flex-col pl-[103px] pr-20 gap-[14px] border-b">
        <NavBar links={MAIN_MENU_AGENT_ITEMS} activePath={path} />
      </div>
      <div className="flex flex-col px-[126px] pt-[60px] gap-[30px]">
        <Typography size="text-3xl">Nomenclature</Typography>
        <ProductSearchTools
          variant={ProductSearchBarStyle.NOMENCLATURE}
          onFilterByCategoryClick={onFilterByCategoryClick}
          onFavoriteClick={onFavoriteClick}
        />
        <div className="flex flex-col relative w-full">
          {showCategoryFilters && <CategoryProductDesktop />}
          {currentProduct && <CategoryProductDesktop defaultProduct={currentProduct} />}
          <div className="absolute right-0">
            <ModalSelectCountry />
          </div>
        </div>
      </div>
    </>
  );
};

export { NomenclatureAgentDesktop };
