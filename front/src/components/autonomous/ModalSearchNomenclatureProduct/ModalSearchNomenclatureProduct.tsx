import React from 'react';

import { SearchProduct } from '@/components/business/SearchProduct';
import DownModal from '@/components/common/DownModal';
import { IdRequiredProduct } from '@/model/product';
import { useStore } from '@/stores/store';

interface ModalSearchNomenclatureProductProps {
  open: boolean;
  onClose?: () => void;
  onSearchAll?: (search: string) => void;
  onClickProduct?: (product: IdRequiredProduct, searchValue: string) => void;
}

export const ModalSearchNomenclatureProduct: React.FC<ModalSearchNomenclatureProductProps> = ({
  onClose,
  onSearchAll,
  open,
  onClickProduct,
}) => {
  const { searchNomenclatureProducts } = useStore((state) => ({
    searchNomenclatureProducts: state.searchNomenclatureProducts,
  }));

  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onClose} withoutMargin>
        <div className="flex h-[calc(100vh-50px)] flex-1 flex-col gap-6 w-full">
          <SearchProduct
            onSearch={searchNomenclatureProducts}
            autoFocus
            withSearchIcon
            onClickProduct={onClickProduct}
            onSearchAll={onSearchAll}
            placeholder="Saisissez votre recherche…"
          />
        </div>
      </DownModal>
    </>
  );
};
