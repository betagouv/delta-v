import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { StepsFormProduct } from './StepsFormProduct';
import { Product, ProductDisplayTypes } from '@/model/product';
import { productFactory } from '@/tests/factories/Product.factory';

export default {
  title: 'Components/Business/StepsFormProduct',
  component: StepsFormProduct,
} as Meta;

export interface FormSimulatorData {
  value?: number;
  devise?: string;
}

const currentProduct: Product = productFactory({
  id: 'b47dab76-acca-4d78-ba3b-7323b17dcb8b',
  name: 'Vêtement pour adulte',
  icon: 'categoryAdultClothes',
  finalProduct: true,
  productDisplayTypes: ProductDisplayTypes.radio,
  info: 'Vêtement pour adulte.',
  childrenQuestion: 'Est-il en cuir ?',
  customDuty: null,
  vat: null,
  nomenclatures: null,
  subProducts: [
    productFactory({
      id: '98b58ced-de0c-40d9-95cc-8247fe63fe17',
      name: 'Oui',
      icon: undefined,
      finalProduct: false,
      productDisplayTypes: ProductDisplayTypes.addable,
      info: 'Vêtements adulte en cuir.',
      childrenQuestion: null,
      customDuty: 4,
      vat: 20,
      nomenclatures: ['42031000'],
      subProducts: [],
    }),
    productFactory({
      id: '15edcc66-1123-47cb-855e-d0eae1233682',
      name: 'Non',
      icon: undefined,
      finalProduct: false,
      productDisplayTypes: ProductDisplayTypes.radio,
      info: 'Vêtements sans cuir.',
      childrenQuestion: 'Est-ce un soutiens-george, gaines, corsets, jarretelles ou jarretières ?',
      customDuty: null,
      vat: null,
      nomenclatures: ['4203'],
      subProducts: [
        productFactory({
          id: 'e6520fa8-8e59-4d57-ab98-3a5ad690ac5a',
          name: 'Oui',
          icon: undefined,
          finalProduct: false,
          productDisplayTypes: ProductDisplayTypes.addable,
          info: 'Soutiens-gorge, gaines, corsets, bretelles, jarretelles, jarretières, etc.',
          childrenQuestion: null,
          customDuty: 6.5,
          vat: 20,
          nomenclatures: ['6212'],
          subProducts: [],
        }),
        productFactory({
          id: '4dbcac27-c57e-4c8f-befb-9c8092c1c450',
          name: 'Non',
          icon: undefined,
          finalProduct: false,
          productDisplayTypes: ProductDisplayTypes.addable,
          info: 'Vêtements adultes dans la liste suivante : \\n- Manteaux, cabans, capes,anoraks, blousons, etc. \\n- Costumes, complets, ensembles, vestons, pantalons, salopettes, shorts, survêtements, robes, jupes, etc. \\n- Chemises, chemisettes, chemisiers, blouses, T-shirts et maillots de corps, chandails, pull-overs, cardigans, gilets, etc. \\n- Slips, caleçons, chemises de nuit, pyjamas, peignoirs, robes de chambre, combinaisons, etc.',
          childrenQuestion: null,
          customDuty: 12,
          vat: 20,
          nomenclatures: null,
          subProducts: [],
        }),
      ],
    }),
  ],
});

export const base = (): JSX.Element => {
  const { register, control } = useForm<FormSimulatorData>({
    defaultValues: {
      value: undefined,
      devise: 'eur',
    },
  });
  return (
    <div className="p-3">
      <br />
      <StepsFormProduct
        currentProduct={currentProduct}
        control={control}
        register={register}
        setSteps={() => {}}
        steps={[currentProduct]}
      />
      <br />
    </div>
  );
};
