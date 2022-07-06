import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { Header } from '@/components/business/header';
import { Button } from '@/components/common/Button';
import { TitleHeader } from '@/components/common/TitleHeader';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { IOptions } from '@/components/input/StandardInputs/Select';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

interface AddNewProductForm {
  productName?: string;
  category?: string;
  price?: number;
  devise?: string;
}

const selectOptions = [
  {
    value: 'EURO',
    id: 'eur',
  },
];

const AddNewProduct = () => {
  const router = useRouter();
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
      price: undefined,
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
    getProductsResponse();
  }, []);

  const onSubmit = (data: AddNewProductForm) => {
    setSubmitted(true);
    addProduct({ amount: 1, id: uuidv4(), name: data.productName ?? '', price: data.price ?? 0 });
    setTimeout(() => {
      router.push('/simulateur/produits');
    }, 500);
  };

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="flex h-full flex-col gap-6">
        <Header withCart />
        <TitleHeader
          title={
            <>
              Nouvelle
              <br /> marchandise
            </>
          }
          icon="calculator"
        />
        <form className="flex h-full flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
            name="price"
            type="number"
            label="Saisissez le montant"
            placeholder="Montant"
            register={register('price', { required: true })}
          />
          <InputGroup
            label="Choisissez la devise"
            type="simple-select"
            fullWidth={false}
            name="devise"
            options={selectOptions}
            register={register('devise', { required: true })}
          />
          <div className="flex-1" />
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
    </Main>
  );
};
export default AddNewProduct;
