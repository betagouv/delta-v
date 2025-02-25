import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { Alpha2Code } from 'i18n-iso-countries';
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
  alcoholDegree?: string;
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
  alcoholDegree?: number;
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
  const isStrongAlcohol =
    product?.amountProduct === 'strongAlcohol' || product?.amountProduct === 'spiritDrink';
  const isSoftAlcohol =
    product?.amountProduct === 'softAlcohol' || product?.amountProduct === 'alcoholIntermediate';

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
    const formValues = getValues();
    if (productType === 'alcohol') {
      const alcoholDegree = parseFloat(formValues.alcoholDegree);
      if (Number.isNaN(alcoholDegree) || alcoholDegree < 0 || alcoholDegree > 100) {
        return;
      }
      if (isStrongAlcohol && alcoholDegree < 22) {
        return;
      }
      if (isSoftAlcohol && alcoholDegree >= 22) {
        return;
      }
    }

    if (onButtonClick) {
      const data = {
        name: formValues.name,
        value: formValues.value,
        currency: formValues.currency,
        alcoholDegree: formValues.alcoholDegree,
      };
      onButtonClick(data);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

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
          {productType === 'alcohol' && (
            <InputGroup
              disabled={disabled}
              label="Degré d'alcool"
              placeholder="Degré"
              type="text"
              fullWidth={false}
              name="alcoholDegree"
              register={register('alcoholDegree', {
                required: productType === 'alcohol',
                validate: {
                  isValidDegree: (value: string) => {
                    if (!value) return true;
                    const num = parseFloat(value);
                    if (Number.isNaN(num) || num < 0 || num > 100) {
                      return "Le degré d'alcool doit être un nombre entre 0 et 100";
                    }
                    if (isStrongAlcohol && num < 22) {
                      return "Le degré d'alcool doit être supérieur ou égal à 22° pour les alcools forts";
                    }
                    if (isSoftAlcohol && num >= 22) {
                      return "Le degré d'alcool doit être inférieur à 22° pour les alcools faibles";
                    }
                    return true;
                  },
                },
              })}
              control={control}
              trailingAddons="%"
              error={errors.alcoholDegree?.message as string | undefined}
              newLabel={false}
              withBorder={templateRole !== 'agent'}
            />
          )}
          <Info>
            <div className="md:text-xs leading-tight">
              Vous souhaitez en savoir plus sur les
              <br className="md:hidden block" /> quantités que vous pouvez
              <br className="md:hidden block" />
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
            disabled={disabled || hasErrors}
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
      {productType !== 'valueProduct' && country && (
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
