import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import type { Alpha2Code } from 'i18n-iso-countries';
import { FieldErrors } from 'react-hook-form';
import shallow from 'zustand/shallow';

// eslint-disable-next-line import/no-cycle
import { Role } from '../FormSelectProduct/utils';
import { Button } from '@/components/atoms/Button';
import { Info } from '@/components/atoms/Info';
import { TextLink } from '@/components/atoms/TextLink';
import { Typography } from '@/components/atoms/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { ModalMaximumAmount } from '@/components/organisms/ModalMaximumAmount';
import { getAmountProductType, getUnit } from '@/model/amount';
import { Currencies } from '@/model/currencies';
import { DeclarationRequest } from '@/stores/declaration/appState.store';
import { SimulatorRequest } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';

export interface OnAddProductValueOptions {
  name: string;
  value: string;
  currency: string;
}
interface FormAddProductProps {
  register: any;
  control: any;
  getValues: any;
  disabled?: boolean;
  productId?: string;
  submitted?: boolean;
  errors: FieldErrors;
  defaultCurrency?: string;
  templateRole?: Role;
  buttonType?: 'submit' | 'button';
  onButtonClick?: (options: OnAddProductValueOptions) => void;
}

export interface FormSimulatorData {
  value?: number;
  currency?: string;
}

interface GetCurrentRequestOptions {
  templateRole?: Role;
  simulatorRequest: SimulatorRequest;
  declarationAgentRequest: DeclarationRequest;
  declarationRequest: DeclarationRequest;
}

const getCurrentRequest = ({
  templateRole,
  declarationAgentRequest,
  simulatorRequest,
  declarationRequest,
}: GetCurrentRequestOptions): { border?: boolean; country?: Alpha2Code } => {
  if (templateRole === 'user') {
    return {
      border: simulatorRequest.border,
      country: simulatorRequest.country,
    };
  }
  if (templateRole === 'userDeclaration') {
    return {
      border: declarationRequest.border,
      country: declarationRequest.meansOfTransportAndCountry.country,
    };
  }
  return {
    border: declarationAgentRequest.border,
    country: declarationAgentRequest.meansOfTransportAndCountry.country,
  };
};

export const FormAddProduct: React.FC<FormAddProductProps> = ({
  register,
  control,
  getValues,
  disabled = false,
  submitted = false,
  productId,
  errors,
  defaultCurrency = 'EUR',
  templateRole,
  buttonType = 'submit',
  onButtonClick,
}: FormAddProductProps) => {
  const { currencies, simulatorRequest, declarationAgentRequest, declarationRequest, findProduct } =
    useStore(
      (state) => ({
        currencies: state.currencies.appState.currencies,
        simulatorRequest: state.simulator.appState.simulatorRequest,
        declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
        declarationRequest: state.declaration.appState.declarationRequest,
        findProduct: state.findProduct,
      }),
      shallow,
    );

  const [border, setBorder] = useState<boolean | undefined>();
  const [country, setCountry] = useState<Alpha2Code | undefined>();

  useEffect(() => {
    const { border: currentBorder, country: currentCountry } = getCurrentRequest({
      templateRole,
      declarationAgentRequest,
      simulatorRequest,
      declarationRequest,
    });
    setBorder(currentBorder);
    setCountry(currentCountry);
  }, [templateRole, declarationAgentRequest, simulatorRequest, declarationRequest]);

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

  const handleSubmitClick = () => {
    if (onButtonClick) {
      const data = {
        name: getValues('name'),
        value: getValues('value'),
        currency: getValues('currency'),
      };
      onButtonClick(data);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 w-full">
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
            newLabel={false}
            withBorder={templateRole !== 'agent'}
          />
          <Info>
            <div className="md:text-xs leading-tight">
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
        <div
          className={classNames({
            'grid grid-cols-2 gap-5': templateRole === 'agent',
            'flex flex-col gap-5': templateRole !== 'agent',
          })}
        >
          <div className="flex flex-col gap-2">
            <InputGroup
              disabled={disabled}
              placeholder="Montant"
              type="number"
              fullWidth={false}
              label="Saisissez le montant"
              name="value"
              register={register('value', { required: false })}
              control={control}
              error={errors.value?.message as string | undefined}
              withBorder={templateRole !== 'agent'}
              newLabel
            />
          </div>
          <div className="flex flex-col gap-2">
            <InputGroup
              disabled={disabled}
              type="select"
              fullWidth={true}
              name="currency"
              label="Choisissez une devise"
              options={selectOptions}
              register={register('currency', { required: true })}
              control={control}
              error={errors.currency?.message as string | undefined}
              withBorder={templateRole !== 'agent'}
              newLabel
            />
          </div>
        </div>
      )}
      {templateRole === 'agent' && (
        <div className="flex flex-col gap-2">
          <InputGroup
            type="text"
            fullWidth
            name="name"
            label="Ajouter une dénomination"
            placeholder="Exemple : Jeans, pantalon noir, slim..."
            register={register('name', { required: false })}
            error={errors.name?.message as string | undefined}
            newLabel
          />
        </div>
      )}
      {submitted ? (
        <div className="flex justify-center">
          <Typography color="link" size="text-xl" weight="bold">
            Merci !
          </Typography>
        </div>
      ) : (
        <div className={classNames({ 'w-40': templateRole === 'agent' })}>
          <Button
            disabled={disabled}
            fullWidth={true}
            type={buttonType}
            onClick={buttonType === 'button' ? handleSubmitClick : undefined}
            className={{
              'md:w-[118px]': true,
              'md:h-[34px]': true,
              'text-xs': true,
            }}
          >
            Ajouter
          </Button>
        </div>
      )}
      {productType !== 'valueProduct' && (
        <ModalMaximumAmount
          open={openModalInfoProduct}
          onClose={() => setOpenModalInfoProduct(false)}
          productType={productType}
          country={country}
          border={border}
        />
      )}
    </div>
  );
};
