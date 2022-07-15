import React from 'react';

import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';
import { AmountProduct, Product, ProductType } from '@/model/product';

interface FormAddProductProps {
  register: any;
  control: any;
  disabled?: boolean;
  product?: Product;
}

export interface FormSimulatorData {
  value?: number;
  devise?: string;
}

const selectOptions = [
  {
    value: 'EURO',
    id: 'eur',
  },
];

const getUnit = (amountProduct?: AmountProduct): string | undefined => {
  switch (amountProduct) {
    case AmountProduct.cigarette:
    case AmountProduct.cigarillos:
    case AmountProduct.cigar:
      return 'unités';
    case AmountProduct.tobacco:
      return 'gramse';
    default:
      return undefined;
  }
};

export const FormAddProduct: React.FC<FormAddProductProps> = ({
  register,
  control,
  disabled = false,
  product,
}: FormAddProductProps) => {
  const isAmountProduct = product?.productType === ProductType.amount;

  return (
    <>
      {isAmountProduct ? (
        <InputGroup
          disabled={disabled}
          label="Saisissez la quantité"
          placeholder="Quantité"
          type="number"
          fullWidth={false}
          name="value"
          options={selectOptions}
          register={register('value', { required: true })}
          control={control}
          trailingAddons={getUnit(product?.amountProduct)}
        />
      ) : (
        <>
          <InputGroup
            disabled={disabled}
            label="Saisissez le montant"
            placeholder="Montant"
            type="number"
            fullWidth={false}
            name="value"
            options={selectOptions}
            register={register('value', { required: true })}
            control={control}
          />
          <InputGroup
            disabled={disabled}
            label="Choisissez la devise"
            type="simple-select"
            fullWidth={false}
            name="devise"
            options={selectOptions}
            register={register('devise', { required: true })}
            control={control}
          />
        </>
      )}
      <div className="flex-1" />
      <Button disabled={disabled} fullWidth={true} type="submit">
        Valider
      </Button>
    </>
  );
};
