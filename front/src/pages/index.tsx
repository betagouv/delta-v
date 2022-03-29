import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { FormSimulator } from '@/components/business/formSimulator';
import { ProductTree } from '@/components/business/productTree';
import { ResponseSimulator } from '@/components/business/responseSimulator';
import { Meta } from '@/layout/Meta';
import { useProductsStore } from '@/stores/product.store';
import { useSimulateStore } from '@/stores/simulate.store';
import { Main } from '@/templates/Main';
import { formatValidationsErrors } from '@/utils/error';

export interface FormSimulatorData {
  border?: boolean;
  age: number;
  meanOfTransport: string;
  shopingProducts: ShopingProduct[];
}

interface ShopingProduct {
  id: string;
  amount: number;
  price: number;
}

const Index = () => {
  const [meanOfTransport, setMeanOfTransport] = useState();

  const getSimulateResponse = useSimulateStore((state) => state.getSimulateResponse);
  const simulateResponse = useSimulateStore((state) => state.simulateResponse);
  const getProductsResponse = useProductsStore((state) => state.getProductsResponse);
  const productsResponse = useProductsStore((state) => state.productsResponse);
  const error = useSimulateStore((state) => state.error);

  const {
    handleSubmit,
    setValue,
    register,
    control,
    setError,
    formState: { errors: formErrors },
  } = useForm<FormSimulatorData>({
    defaultValues: {
      border: false,
      age: 30,
      meanOfTransport: 'plane',
      shopingProducts: [
        { id: '', amount: 0, price: 0 },
        { id: '', amount: 0, price: 0 },
        { id: '', amount: 0, price: 0 },
        { id: '', amount: 0, price: 0 },
        { id: '', amount: 0, price: 0 },
      ],
    },
  });
  useEffect(() => {
    if (error) {
      const formattedErrors = formatValidationsErrors(error);
      formattedErrors.forEach((e) => setError(e.name as any, { type: e.type, message: e.message }));
    }

    getProductsResponse();
  }, [error, getProductsResponse, setError]);

  const onSubmit = async (data: FormSimulatorData) => {
    const shopingProducts: ShopingProduct[] = data.shopingProducts.filter(
      ({ id, amount, price }) => id && amount && price,
    );

    const formatedData: FormSimulatorData = {
      age: data.age,
      border: data.border,
      meanOfTransport: data.meanOfTransport,
      shopingProducts,
    };

    await getSimulateResponse(formatedData);
  };

  const onChangeBorder = (value: string) => {
    const border = value === '1';
    setValue('border', border);
  };

  const onChangeMeanOfTransport = (e: any) => {
    const dataMeanOfTransport = e.target.value;
    setMeanOfTransport(dataMeanOfTransport);
    setValue('meanOfTransport', dataMeanOfTransport);
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
        <div className="grow">
          {productsResponse &&
            productsResponse.map((product) => (
              <>
                <div key={product.id}>
                  <ProductTree product={product} />
                </div>
                <br />
              </>
            ))}
        </div>
        <div className="grow">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSimulator
              onChangeBorder={onChangeBorder}
              onChangeMeanOfTransport={onChangeMeanOfTransport}
              meanOfTransport={meanOfTransport}
              register={register}
              control={control}
              errors={formErrors}
            />
          </form>
          <ResponseSimulator response={simulateResponse} />
        </div>
      </div>
    </Main>
  );
};

export default Index;
