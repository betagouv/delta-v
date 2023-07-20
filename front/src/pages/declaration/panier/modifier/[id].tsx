import { useEffect } from 'react';

import Error from 'next/error';
import { useRouter } from 'next/router';
import { FieldErrors, useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { FormAddProduct } from '@/components/business/FormAddProduct';
import { Input } from '@/components/input/StandardInputs/Input';
import { declaration } from '@/core/hoc/declaration.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

export interface FormUpdateShoppingProduct {
  name?: string;
  value: number;
  currency: string;
}

const UpdateProductBasket = () => {
  const { findDeclarationShoppingProduct, updateProductCartDeclaration } = useStore(
    (state) => ({
      findDeclarationShoppingProduct: state.findDeclarationShoppingProduct,
      updateProductCartDeclaration: state.updateProductCartDeclaration,
    }),
    shallow,
  );
  const router = useRouter();
  const { id } = router.query;
  const currentProduct = findDeclarationShoppingProduct(id as string);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormUpdateShoppingProduct>({
    defaultValues: {
      name: undefined,
      value: undefined,
      currency: 'EUR',
    },
  });

  useEffect(() => {
    if (currentProduct) {
      reset({
        name: currentProduct.name,
        value: currentProduct.value,
        currency: currentProduct.currency,
      });
    }
  }, [currentProduct]);

  const onUpdateShoppingProduct = ({ value, name, currency }: FormUpdateShoppingProduct) => {
    updateProductCartDeclaration({ id: id as string, value, name: name ?? '', currency });
    router.push('/declaration/panier');
  };

  if (!currentProduct) {
    return <Error statusCode={404} />;
  }

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
      withTitle
      titleValue={currentProduct?.name}
      titleIcon="douanier"
      method="declaration"
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
                  withBorder
                />
              </div>
              <FormAddProduct
                productId={currentProduct.productId}
                control={control}
                register={register}
                errors={errors as FieldErrors}
                templateRole="user"
              />
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
};
export default declaration(UpdateProductBasket);
