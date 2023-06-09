import React, { useState } from 'react';

import { FieldErrors } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { ModalMaximumAmount } from '@/components/autonomous/ModalMaximumAmount';
import { Button } from '@/components/common/Button';
import { Info } from '@/components/common/Info';
import { TextLink } from '@/components/common/TextLink';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { getAmountProductType, getUnit } from '@/model/amount';
import { Currencies } from '@/model/currencies';
import { useStore } from '@/stores/store';

interface FormAddProductProps {
  register: any;
  control: any;
  disabled?: boolean;
  productId?: string;
  submitted?: boolean;
  errors: FieldErrors;
  defaultCurrency?: string;
}

export interface FormSimulatorData {
  value?: number;
  currency?: string;
}

export const FormAddProduct: React.FC<FormAddProductProps> = ({
  register,
  control,
  disabled = false,
  submitted = false,
  productId,
  errors,
  defaultCurrency = 'EUR',
}: FormAddProductProps) => {
  const { currencies, simulatorRequest, findProduct } = useStore(
    (state) => ({
      currencies: state.currencies.appState.currencies,
      simulatorRequest: state.simulator.appState.simulatorRequest,
      findProduct: state.findProduct,
    }),
    shallow,
  );

  const product = productId ? findProduct(productId) : undefined;

  const selectedCurrency = currencies.find(
    (currency: Currencies) => currency.id === defaultCurrency,
  );

  const defaultSelectOption = {
    value: selectedCurrency?.name ?? 'Euro',
    id: selectedCurrency?.id ?? 'EUR',
  };

  const otherOptions = currencies.map((currency) => ({
    value: currency.name,
    id: currency.id,
  }));

  const selectOptions = [defaultSelectOption, ...otherOptions];

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
            register={register('value', { required: false })}
            control={control}
            trailingAddons={getUnit(product?.amountProduct)}
            error={errors.value?.message as string | undefined}
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
            register={register('value', { required: false })}
            control={control}
            error={errors.value?.message as string | undefined}
          />
          <InputGroup
            disabled={disabled}
            label="Choisissez la devise"
            type="simple-select"
            fullWidth={false}
            name="currency"
            options={selectOptions}
            register={register('currency', { required: true })}
            control={control}
            error={errors.currency?.message as string | undefined}
          />
        </>
      )}
      <div className="flex-1" />
      {submitted ? (
        <div className="flex justify-center">
          <Typography color="link" size="text-xl" weight="bold">
            Merci !
          </Typography>
        </div>
      ) : (
        <Button disabled={disabled} fullWidth={true} type="submit">
          Valider
        </Button>
      )}
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
