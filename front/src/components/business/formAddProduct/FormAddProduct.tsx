import React, { useState } from 'react';

import { ModalMaximumAmount } from '@/components/autonomous/ModalMaximumAmount';
import { Button } from '@/components/common/Button';
import { Info } from '@/components/common/Info';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { getAmountProductType, getUnit } from '@/model/amount';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';

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

export const FormAddProduct: React.FC<FormAddProductProps> = ({
  register,
  control,
  disabled = false,
  product,
}: FormAddProductProps) => {
  const { country } = useStore((state) => ({
    country: state.simulator.appState.simulatorRequest.country,
  }));
  const productType = product?.amountProduct
    ? getAmountProductType(product.amountProduct)
    : 'valueProduct';
  const [openModalInfoProduct, setOpenModalInfoProduct] = useState<boolean>(false);

  return (
    <>
      {productType !== 'valueProduct' ? (
        <>
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
          <Info>
            <div className="leading-tight">
              Vous souhaitez en savoir plus sur les
              <br /> quantités que vous pouvez <br />
              <div className="flex flex-row gap-1">
                <p>ramener</p>
                <Typography
                  color="link"
                  underline
                  onClick={() => setOpenModalInfoProduct(true)}
                  lineHeight="leading-tight"
                >
                  cliquez ici
                </Typography>
              </div>
            </div>
          </Info>
        </>
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
      {productType !== 'valueProduct' && (
        <ModalMaximumAmount
          open={openModalInfoProduct}
          onClose={() => setOpenModalInfoProduct(false)}
          productType={productType}
          country={country}
        />
      )}
    </>
  );
};
