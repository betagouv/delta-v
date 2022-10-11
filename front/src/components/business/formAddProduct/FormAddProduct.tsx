import React, { useState } from 'react';

import { ModalMaximumAmount } from '@/components/autonomous/ModalMaximumAmount';
import { Button } from '@/components/common/Button';
import { Info } from '@/components/common/Info';
import { TextLink } from '@/components/common/TextLink';
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
  const { simulatorRequest } = useStore((state) => ({
    simulatorRequest: state.simulator.appState.simulatorRequest,
  }));
  const productType = product?.amountProduct
    ? getAmountProductType(product.amountProduct)
    : 'valueProduct';
  const [openModalInfoProduct, setOpenModalInfoProduct] = useState<boolean>(false);

  return (
    <div className="flex flex-1 flex-col gap-6">
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
            register={register('value', { required: false })}
            control={control}
            trailingAddons={getUnit(product?.amountProduct)}
          />
          <Info>
            <div className="leading-tight">
              Vous souhaitez en savoir plus sur les
              <br /> quantités que vous pouvez <br />
              <div className="flex flex-row gap-1">
                <p>ramener</p>
                <TextLink underline onClick={() => setOpenModalInfoProduct(true)}>
                  cliquez ici
                </TextLink>
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
            register={register('value', { required: false })}
            control={control}
          />
          <InputGroup
            disabled={disabled}
            label="Choisissez la devise"
            type="simple-select"
            fullWidth={false}
            name="devise"
            options={selectOptions}
            register={register('devise', { required: false })}
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
          country={simulatorRequest.country}
          border={simulatorRequest.border}
        />
      )}
    </div>
  );
};
