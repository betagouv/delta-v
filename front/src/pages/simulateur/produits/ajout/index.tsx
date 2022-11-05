import { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { ModalAddProduct } from '@/components/autonomous/ModalAddProduct';
import { Button } from '@/components/common/Button';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { IOptions } from '@/components/input/StandardInputs/Select';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

interface AddNewProductForm {
  productName?: string;
  category?: string;
  value?: number;
  devise?: string;
}

const selectOptions = [
  {
    value: 'EURO',
    id: 'eur',
  },
];

const AddNewProduct = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const { trackEvent } = useMatomo();
  const { searchValue } = router.query;
  const productName = typeof searchValue === 'string' ? searchValue : undefined;
  const defaultCategory = { id: '', value: 'Catégorie' };
  const { products, getProductsResponse, addProduct } = useStore(
    (state) => ({
      products: state.products.appState.products,
      getProductsResponse: state.getProductsResponse,
      addProduct: state.addProduct,
    }),
    shallow,
  );
  const { register, handleSubmit, control } = useForm<AddNewProductForm>({
    defaultValues: {
      productName,
      category: defaultCategory.id,
      value: undefined,
      devise: 'eur',
    },
  });

  const [categoryOptions, setCategoryOptions] = useState<IOptions[]>([]);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const options = products.map((product) => ({ id: product.id, value: product.name }));
    setCategoryOptions([defaultCategory, ...options]);
  }, [products]);

  useEffect(() => {
    if (productName) {
      trackEvent({ category: 'user-action', action: 'add-new-product', name: productName });
    }
  }, [productName]);

  useEffect(() => {
    getProductsResponse();
  }, []);

  const onSubmit = (data: AddNewProductForm) => {
    setSubmitted(true);
    addProduct({
      amount: 1,
      id: uuidv4(),
      name: data.productName ?? '',
      value: data.value ?? 0,
      currency: data.devise ?? 'EUR',
    });
    setTimeout(() => {
      setOpenModal(true);
    }, 250);
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
        <form className="flex flex-1 flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <InputGroup
              name="productName"
              type="text"
              label="Nommer votre achat"
              placeholder="Exemple : Jeans, pantalon noir, slim..."
              register={register('productName', { required: true })}
              fullWidth
            />
            <InputGroup
              name="category"
              type="simple-select"
              options={categoryOptions}
              placeholder="Catégorie"
              label="Choisissez la catégorie"
              register={register('category', { required: true })}
              control={control}
            />
            <InputGroup
              name="value"
              type="number"
              label="Saisissez le montant"
              placeholder="Montant"
              register={register('value', { required: true })}
            />
            <InputGroup
              label="Choisissez la devise"
              type="simple-select"
              fullWidth={false}
              name="devise"
              options={selectOptions}
              register={register('devise', { required: true })}
            />
          </div>
          <div className="mb-8 flex flex-1" />
          {submitted ? (
            <div className="flex justify-center">
              <Typography color="link" size="text-xl" weight="bold">
                Merci !
              </Typography>
            </div>
          ) : (
            <Button fullWidth type="submit">
              Valider
            </Button>
          )}
        </form>
      </div>
      <ModalAddProduct open={openModal} onClose={() => setOpenModal(false)} />
    </Main>
  );
};
export default AddNewProduct;
