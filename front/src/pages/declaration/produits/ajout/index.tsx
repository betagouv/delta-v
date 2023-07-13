import { useState } from 'react';

import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { ModalAddProduct } from '@/components/autonomous/ModalAddProduct';
import { AddNewProductForm, FormNewProduct } from '@/components/business/formNewProduct';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const AddNewProduct = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const { searchValue } = router.query;
  const productName = typeof searchValue === 'string' ? searchValue : undefined;
  const { addProduct } = useStore((state) => ({
    addProduct: state.addProductCartDeclaration,
  }));

  const addNewProduct = (data: AddNewProductForm) => {
    addProduct({
      amount: 1,
      id: uuidv4(),
      name: data.name ?? '',
      value: data.value ?? 0,
      currency: data.currency ?? 'EUR',
    });
  };

  return (
    <Main
      meta={
        <Meta
          title="Declaration Déclare Douanes"
          description="Déclaration de douane en quelques clics"
        />
      }
      withHeader
      withCart
      withSearch
      linkSearch="/declaration/produits/recherche"
      withTitle
      titleIcon="categoryDouanier"
      method="declaration"
      titleValue={
        <>
          Nouvelle
          <br /> marchandise
        </>
      }
    >
      <div className="flex flex-1 flex-col gap-6">
        <FormNewProduct
          productName={productName}
          openModal={() => setOpenModal(true)}
          addNewProduct={addNewProduct}
        />
      </div>
      <ModalAddProduct open={openModal} onClose={() => setOpenModal(false)} method="declaration" />
    </Main>
  );
};
export default AddNewProduct;
