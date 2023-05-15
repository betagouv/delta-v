import React, { useState } from 'react';

import { SearchHistory } from '@/components/business/SearchHistory';
import { SearchProduct } from '@/components/business/searchProduct';
import DownModal from '@/components/common/DownModal';

interface ModalSearchProductProps {
  open: boolean;
  onClose?: () => void;
}

export const ModalSearchProduct: React.FC<ModalSearchProductProps> = ({ onClose, open }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <div>
        <DownModal bgColor="bg-note" title="ajouter une note" open={open} onClose={onClose}>
          <SearchProduct onSearch={handleSearch} />
          <SearchHistory histories={{}} />
        </DownModal>
      </div>
    </>
  );
};
