import React from 'react';

import { SearchProduct } from '@/components/business/searchProduct';
import DownModal from '@/components/common/DownModal';
import { Typography } from '@/components/common/Typography';
import { useStore } from '@/stores/store';

interface ModalSearchProductProps {
  open: boolean;
  onClose?: () => void;
}

export const ModalSearchProduct: React.FC<ModalSearchProductProps> = ({ onClose, open }) => {
  const { searchProducts } = useStore((state) => ({
    searchProducts: state.searchProducts,
  }));

  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onClose}>
        <div className="flex h-[90vh] flex-1 flex-col gap-6">
          <Typography tag="h2" color="black" size="text-2xl">
            Recherche
          </Typography>
          <SearchProduct
            onSearch={searchProducts}
            autoFocus
            withSearchIcon
            placeholder="Que recherchez-vous ?"
          />
        </div>
      </DownModal>
    </>
  );
};
