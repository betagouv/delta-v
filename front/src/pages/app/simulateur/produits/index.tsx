import { useEffect } from 'react';

import { CategoryList, Item } from '@/components/common/CategoryList';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { Input } from '@/components/input/StandardInputs/Input';
import { Meta } from '@/layout/Meta';
import { useProductsStore } from '@/stores/product.store';
import { Main } from '@/templates/Main';

const Index = () => {
  const productsResponse = useProductsStore((state) => state.productsResponse);
  const getProductsResponse = useProductsStore((state) => state.getProductsResponse);

  const displayedProducts = productsResponse?.map((product): Item => {
    return {
      to: `/app/simulateur/produits/${product.id}`,
      svgNames: product.icon ?? 'luggages',
      title: product.name,
    };
  });

  console.log(productsResponse);

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
        <Link back>
          <div className="flex flex-row items-end">
            <div className="mr-4 h-5 w-5">
              <Icon name="chevron-thin-left" />
            </div>
            <Typography> Retour</Typography>
          </div>
        </Link>
        <div className="flex flex-row gap-2">
          <div>
            <SvgIcon name="calculator" />
          </div>
          <div className="mt-3">
            <Typography weight="bold" variant="h1" tag="h1" color="secondary">
              Quels achats
              <br />
              souhaitez-vous
              <br />
              déclarer ?
            </Typography>
          </div>
        </div>

        <Input
          name="search"
          type="text"
          fullWidth
          placeholder="Saisissez votre achat"
          trailingIcon="search"
        ></Input>
        <CategoryList items={displayedProducts} title="Catégories" />
      </div>
    </Main>
  );
};
export default Index;
