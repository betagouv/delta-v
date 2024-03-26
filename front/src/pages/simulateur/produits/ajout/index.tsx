import { useState } from 'react';

import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { AddNewProductForm, FormNewProduct } from '@/components/organisms/FormNewProduct';
import { ModalAddProduct } from '@/components/organisms/ModalAddProduct';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const AddNewProduct = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const { searchValue } = router.query;
  const productName = typeof searchValue === 'string' ? searchValue : undefined;
  const { addProduct, defaultCurrency } = useStore(
    (state) => ({
      addProduct: state.addProduct,
      defaultCurrency: state.simulator.appState.simulatorRequest.defaultCurrency,
    }),
    shallow,
  );

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
        <FormNewProduct
          productName={productName}
          openModal={() => setOpenModal(true)}
          addNewProduct={addNewProduct}
          defaultCurrency={defaultCurrency}
        />
      </div>
      <ModalAddProduct open={openModal} onClose={() => setOpenModal(false)} />
    </Main>
  );
};
export default AddNewProduct;
