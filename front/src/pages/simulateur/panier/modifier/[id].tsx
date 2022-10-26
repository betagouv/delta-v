import { useEffect } from 'react';

import Error from 'next/error';
import { useRouter } from 'next/router';
import { FieldErrors, useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { FormAddProduct } from '@/components/business/formAddProduct';
import { Input } from '@/components/input/StandardInputs/Input';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

export interface FormUpdateShoppingProduct {
  name?: string;
  value: string;
  devise: string;
}

const UpdateProductBasket = () => {
  const { findShoppingProduct, updateShoppingProduct } = useStore(
    (state) => ({
      findShoppingProduct: state.findShoppingProduct,
      updateShoppingProduct: state.updateShoppingProduct,
    }),
    shallow,
  );
  const router = useRouter();
  const { id } = router.query;
  const currentProduct = findShoppingProduct(id as string);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormUpdateShoppingProduct>({
    defaultValues: {
      name: undefined,
      value: undefined,
      devise: 'eur',
    },
  });

  useEffect(() => {
    if (currentProduct) {
      setValue('name', currentProduct.name, { shouldValidate: true });
      setValue('value', `${currentProduct.value}`, { shouldValidate: true });
    }
  }, [currentProduct]);

  const onUpdateShoppingProduct = ({ value, name }: FormUpdateShoppingProduct) => {
    updateShoppingProduct({ id: id as string, value: parseFloat(value), name: name ?? '' });
    router.push('/simulateur/panier');
  };

  if (!currentProduct) {
    return <Error statusCode={404} />;
  }

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withCart
      withTitle
      titleValue={currentProduct?.product?.name}
      titleIcon="calculator"
    >
      <div className="flex flex-col gap-6">
        <div>
          <form onSubmit={handleSubmit(onUpdateShoppingProduct)}>
            <div className="flex flex-col gap-6">
              <div>
                <label
                  htmlFor="name"
                  className={`mb-4 block text-base font-bold`}
                  data-testid="label-element"
                >
                  Nommez votre achat{' '}
                  <span className="ml-1 font-normal italic text-gray-400">(facultatif)</span>
                </label>
                <Input
                  fullWidth
                  name="name"
                  type="text"
                  placeholder="Exemple : Jeans, pantalon noir, slim..."
                  register={register('name', { required: false })}
                />
              </div>
              <FormAddProduct
                product={currentProduct.product}
                control={control}
                register={register}
                errors={errors as FieldErrors}
              />
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
};
export default simulator(UpdateProductBasket);
