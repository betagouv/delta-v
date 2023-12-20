import React from 'react';

import { SearchProduct } from '@/components/business/SearchProduct';
import DownModal from '@/components/common/DownModal';
import { IdRequiredProduct } from '@/model/product';
import { useStore } from '@/stores/store';

interface ModalSearchProductProps {
  open: boolean;
  onClose?: () => void;
  onSearchAll?: (search: string) => void;
  onClickProduct?: (product: IdRequiredProduct) => void;
}

export const ModalSearchProduct: React.FC<ModalSearchProductProps> = ({
  onClose,
  onSearchAll,
  open,
  onClickProduct,
}) => {
  const { searchProducts } = useStore((state) => ({
    searchProducts: state.searchProducts,
  }));

  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onClose} withoutMargin>
        <div className="flex h-[calc(100vh-50px)] flex-1 flex-col w-full">
          <SearchProduct
            onSearch={searchProducts}
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
