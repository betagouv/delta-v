import { useState } from 'react';

import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { AddNewProductForm, FormNewProduct } from '@/components/organisms/FormNewProduct';
import { ModalAddProduct } from '@/components/organisms/ModalAddProduct';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';

const AddNewProduct = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const { searchValue } = router.query;
  const productName = typeof searchValue === 'string' ? searchValue : undefined;
  const { addProduct, defaultCurrency } = useStore(
    (state) => ({
      addProduct: state.addProductCartDeclarationAgent,
      defaultCurrency: state.declaration.appState.declarationRequest.defaultCurrency,
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
    <MainAgent
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withTitle
      titleHeader="Nouvelle marchandise"
    >
      <div className="flex flex-1 flex-col py-4 mx-5">
        <div className="flex flex-1 flex-col gap-6">
          <FormNewProduct
            productName={productName}
            openModal={() => setOpenModal(true)}
            addNewProduct={addNewProduct}
            defaultCurrency={defaultCurrency}
            templateRole="agent"
          />
        </div>
        <ModalAddProduct open={openModal} onClose={() => setOpenModal(false)} method="agent" />
      </div>
    </MainAgent>
  );
};
export default AddNewProduct;
