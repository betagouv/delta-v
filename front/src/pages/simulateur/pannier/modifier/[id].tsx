import { useEffect } from 'react';

import Error from 'next/error';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { FormAddProduct } from '@/components/business/formAddProduct';
import { Header } from '@/components/business/header';
import { TitleHeader } from '@/components/common/TitleHeader';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

export interface FormUpdateShoppingProduct {
  name?: string;
  price: number;
  devise: string;
}

const UpdateProductBasket = () => {
  const findShoppingProduct = useStore((state) => state.findShoppingProduct);
  const updateShoppingProduct = useStore((state) => state.updateShoppingProduct);
  const router = useRouter();
  const { id } = router.query;
  const currentProduct = findShoppingProduct(id as string);

  const { handleSubmit, register, control, setValue } = useForm<FormUpdateShoppingProduct>({
    defaultValues: {
      name: undefined,
      price: undefined,
      devise: 'eur',
    },
  });

  useEffect(() => {
    if (currentProduct) {
      setValue('name', currentProduct.name, { shouldValidate: true });
      setValue('price', currentProduct.price, { shouldValidate: true });
    }
  }, [currentProduct]);

  const onUpdateShoppingProduct = ({ price, name }: FormUpdateShoppingProduct) => {
    updateShoppingProduct({ id: id as string, price, name: name ?? '' });
    router.push('/simulateur/pannier');
  };

  if (!currentProduct) {
    return <Error statusCode={404} />;
  }

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
        <TitleHeader title={currentProduct?.product.name} icon="calculator" />
        <div>
          <form onSubmit={handleSubmit(onUpdateShoppingProduct)} className="h-full">
            <div className="flex h-full flex-col gap-6">
              <InputGroup
                fullWidth
                name="name"
                type="text"
                label="Nommez votre achat"
                placeholder="Exemple : Jeans, pantalon noir, slim..."
                control={control}
                register={register('name', { required: true })}
              />
              <FormAddProduct control={control} register={register} />
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
};
export default UpdateProductBasket;
