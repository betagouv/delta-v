import { useState } from 'react';

import { useRouter } from 'next/router';

import { ModalAddProduct } from '@/components/autonomous/ModalAddProduct';
import { FormNewProduct } from '@/components/business/formNewProduct';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const AddNewProduct = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const { searchValue } = router.query;
  const productName = typeof searchValue === 'string' ? searchValue : undefined;

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withCart
      withTitle
      titleValue={
        <>
          Nouvelle
          <br /> marchandise
        </>
      }
      titleIcon="calculator"
    >
      <div className="flex flex-1 flex-col gap-6">
        <FormNewProduct productName={productName} openModal={() => setOpenModal(true)} />
      </div>
      <ModalAddProduct open={openModal} onClose={() => setOpenModal(false)} />
    </Main>
  );
};
export default AddNewProduct;
