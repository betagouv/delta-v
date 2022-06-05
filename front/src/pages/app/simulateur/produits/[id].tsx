import { useEffect } from 'react';

import Error from 'next/error';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { CategoryList } from '@/components/common/CategoryList';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { useProductsStore } from '@/stores/product.store';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const ProductSearch = () => {
  const findProduct = useProductsStore((state) => state.findProduct);
  const getProductsResponse = useProductsStore((state) => state.getProductsResponse);
  const addProduct = useStore((state) => state.addProduct);
  const shoppingProducts = useStore((state) => state.simulator.appState.shoppingProducts);
  const router = useRouter();
  const { id } = router.query;

  const currentProduct = findProduct(id as string);

  if (!currentProduct) {
    return <Error statusCode={404} />;
  }

  interface FormSimulatorData {
    price?: number;
    devise?: string;
  }
  const selectOptions = [
    {
      value: 'EURO',
      id: 'eur',
    },
  ];

  const { handleSubmit, register, control } = useForm<FormSimulatorData>({
    defaultValues: {
      price: undefined,
      devise: 'eur',
    },
  });

  const onSubmit = (data: FormSimulatorData) => {
    const product: ShoppingProduct = {
      id: currentProduct.id,
      price: data.price ?? 1,
      amount: 1,
    };
    addProduct(product);
    router.push('/app/simulateur/produits');
  };

  const displayedProducts = currentProduct?.subProducts.map((product) => {
    return {
      to: `/app/simulateur/produits/${product.id}`,
      svgNames: product.icon ?? 'luggages',
      title: product.name,
    };
  });

  useEffect(() => {
    getProductsResponse();
  }, [getProductsResponse]);

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="flex flex-col gap-6 px-4 py-8">
        <div className="flex flex-row">
          <Link back>
            <div className="flex flex-row items-end">
              <div className="mr-4 h-5 w-5">
                <Icon name="chevron-thin-left" />
              </div>
              <Typography> Retour</Typography>
            </div>
          </Link>
          <div className="flex-1" />
          <div className="flex h-7 w-7 flex-row">
            <SvgIcon name="basket" />
            {shoppingProducts && shoppingProducts.length > 0 && (
              <div>{shoppingProducts.length}</div>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <SvgIcon name="calculator" />
          </div>
          <div className="mt-3">
            <Typography weight="bold" variant="h1" tag="h1" color="secondary">
              {currentProduct?.name}
            </Typography>
          </div>
        </div>
        {!currentProduct.finalProduct && (
          <CategoryList items={displayedProducts} title="Catégories" />
        )}
        {currentProduct.finalProduct && (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputGroup
                label="Saisissez le montant"
                type="number"
                fullWidth={false}
                name="price"
                options={selectOptions}
                register={register('price', { required: true })}
                control={control}
              />
              <br />
              <InputGroup
                label="Choisissez la devise"
                type="simple-select"
                fullWidth={false}
                name="devise"
                options={selectOptions}
                register={register('devise', { required: true })}
                control={control}
              />
              <div className="absolute inset-x-0 bottom-0 w-full">
                <div className="p-4">
                  <Button fullWidth={true} type="submit">
                    Valider
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </Main>
  );
};
export default ProductSearch;
