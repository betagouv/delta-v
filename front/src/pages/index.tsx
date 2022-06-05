import { useEffect } from 'react';

import { Alpha2Code } from 'i18n-iso-countries';
import { useFieldArray, useForm } from 'react-hook-form';

import { FormSimulator } from '@/components/business/formSimulator';
import { ProductTree } from '@/components/business/productTree';
import { ResponseSimulator } from '@/components/business/responseSimulator';
import { Button } from '@/components/common/Button';
import { Link } from '@/components/common/Link';
import { Meta } from '@/layout/Meta';
import { Product, useProductsStore } from '@/stores/product.store';
import { useSimulateStore } from '@/stores/simulate.store';
import { Main } from '@/templates/Main';
import { formatValidationsErrors } from '@/utils/error';

export interface FormSimulatorData {
  border?: boolean;
  age: number;
  meanOfTransport: string;
  country: Alpha2Code;
  shoppingProducts: ShoppingProduct[];
}

interface ShoppingProduct {
  id: string;
  name?: string;
  amount: number;
  price: number;
}

const Index = () => {
  const getSimulateResponse = useSimulateStore((state) => state.getSimulateResponse);
  const simulateResponse = useSimulateStore((state) => state.simulateResponse);
  const getProductsResponse = useProductsStore((state) => state.getProductsResponse);
  const productsResponse = useProductsStore((state) => state.productsResponse);
  const error = useSimulateStore((state) => state.error);

  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors: formErrors },
  } = useForm<FormSimulatorData>({
    defaultValues: {
      border: false,
      age: 30,
      meanOfTransport: 'plane',
      country: 'US',
      shoppingProducts: [],
    },
  });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: 'shoppingProducts',
  });

  useEffect(() => {
    if (error) {
      const formattedErrors = formatValidationsErrors(error);
      formattedErrors.forEach((e) => setError(e.name as any, { type: e.type, message: e.message }));
    }

    getProductsResponse();
  }, [error, getProductsResponse, setError]);

  const onSubmit = async (data: FormSimulatorData) => {
    const shoppingProducts: ShoppingProduct[] = data.shoppingProducts.map(
      ({ id, amount, price }) => ({
        id,
        amount,
        price,
      }),
    );

    const formatedData: FormSimulatorData = {
      age: data.age,
      border: data.border,
      meanOfTransport: data.meanOfTransport,
      country: data.country,
      shoppingProducts,
    };

    await getSimulateResponse(formatedData);
  };

  const onAddProduct = (product: Product) => {
    appendProduct({ id: product.id, name: product.name, amount: 1, price: 1 });
  };

  const onRemoveProduct = (index: number) => {
    removeProduct(index);
  };

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="flex flex-row">
        <div className="w-1/2">
          {productsResponse &&
            productsResponse.map((product) => (
              <>
                <div key={product.id}>
                  <ProductTree product={product} onAddProduct={onAddProduct} />
                </div>
                <br />
              </>
            ))}
        </div>
        <div className="w-1/2 p-5">
          <Link to="/app">
            <Button>Application</Button>
          </Link>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSimulator
              register={register}
              control={control}
              errors={formErrors}
              fields={productFields}
              remove={onRemoveProduct}
            />
          </form>
          <ResponseSimulator response={simulateResponse} />
        </div>
      </div>
    </Main>
  );
};

export default Index;
