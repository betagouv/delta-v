import React from 'react';

import { SearchProduct } from '@/components/business/searchProduct';
import DownModal from '@/components/common/DownModal';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';

interface ModalSearchProductProps {
  open: boolean;
  onClose?: () => void;
  onSearchAll?: (search: string) => void;
  onClickProduct?: (product: Product) => void;
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
        <div className="flex h-[90vh] flex-1 flex-col gap-6">
          <SearchProduct
            onSearch={searchProducts}
            autoFocus
            withSearchIcon
            onClickProduct={onClickProduct}
            onSearchAll={onSearchAll}
          />
        </div>
      </DownModal>
    </>
  );
};
