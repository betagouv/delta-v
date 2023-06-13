import { useEffect, useMemo, useState } from 'react';

import { Alpha2Code, getNames } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { ModalCategoryProduct } from '@/components/autonomous/ModalCategoryProduct';
import { ModalSearchProduct } from '@/components/autonomous/ModalSearchProduct';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';
import { declaration } from '@/core/hoc/declaration.hoc';
import { Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';
import { disabledCountries } from '@/utils/const';

export interface FormDeclarationData {
  country?: Alpha2Code;
}

const Declaration = () => {
  const {
    resetDeclarationSteps,
    validateDeclarationStep3,
    setProductsDeclarationToDisplay,
    getAllShoppingProduct,
    removeProductDeclaration,
    errorValidateDeclaration,
    defaultCurrency,
  } = useStore(
    (state) => ({
      resetDeclarationSteps: state.resetDeclarationSteps,
      validateDeclarationStep3: state.validateDeclarationStep3,
      setProductsDeclarationToDisplay: state.setProductsDeclarationToDisplay,
      getAllShoppingProduct: state.getAllShoppingProduct,
      removeProductDeclaration: state.removeProductCartDeclaration,
      errorValidateDeclaration: state.declaration.appState.error,
      defaultCurrency: state.declaration.appState.declarationRequest.defaultCurrency,
    }),
    shallow,
  );
  const router = useRouter();

  const [openSearchDownModal, setOpenSearchDownModal] = useState(false);
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState(false);
  const [allShoppingProducts, setAllShoppingProducts] = useState<ShoppingProduct[]>([]);

  useEffect(() => {
    resetDeclarationSteps(3);
    setProductsDeclarationToDisplay();
    setAllShoppingProducts(getAllShoppingProduct());
  }, []);

  const onClickProductToRemove = (id: string) => {
    removeProductDeclaration(id);
    setAllShoppingProducts(getAllShoppingProduct());
  };

  const handleCloseDownModal = () => {
    setOpenSearchDownModal(false);
    setOpenCategoryDownModal(false);
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormDeclarationData>({
    defaultValues: {
      country: undefined,
    },
  });

  const onSubmit = () => {
    const declarationId = uuidv4();
    validateDeclarationStep3({
      shoppingProducts: allShoppingProducts,
      declarationId,
    });
    if (errorValidateDeclaration) {
      toast.error(errorValidateDeclaration);
    } else {
      router.push(`/agent/declaration/${declarationId}`);
    }
  };

  register('country', {
    onChange: () => {
      setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 250);
    },
  });

  const countriesAlternatives = [
    {
      id: 'CH',
      alternatives: ['Suisse', 'Switzerland', 'Schweiz'],
    },
    {
      id: 'US',
      alternatives: ['USA', 'United States', 'Etats-Unis'],
    },
    {
      id: 'GB',
      alternatives: ['Royaume-Uni', 'United Kingdom', 'Angleterre', 'UK'],
    },
    {
      id: 'DE',
      alternatives: ['Allemagne', 'Germany', 'Deutschland'],
    },
  ];

  const onClickProduct = (product: Product) => {
    setOpenSearchDownModal(false);
    router.push({
      pathname: '/agent/declaration/produits/recherche',
      query: { id: product.id },
    });
  };

  const onSearchAll = (searchValue: string) => {
    setOpenSearchDownModal(false);
    router.push({
      pathname: '/agent/declaration/produits/recherche',
      query: { search: searchValue },
    });
  };

  const countriesOptions = useMemo(() => {
    const countries = getNames('fr', { select: 'official' });
    const keys = Object.keys(countries) as Alpha2Code[];
    const enabledKeys = keys.filter((key) => !disabledCountries.includes(key));
    return enabledKeys.map((key) => {
      const countryAlternative = countriesAlternatives.find((country) => country.id === key);
      return {
        value: countries[key] ?? '',
        id: key,
        alternatives: countryAlternative?.alternatives ?? [],
      };
    });
  }, []);

  return (
    <AgentRoute>
      <DeclarationSteps
        currentStep={3}
        handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
        onSubmit={onSubmit}
      >
        <div className="mt-1" onClick={() => setOpenSearchDownModal(true)}>
          <InputGroup
            type="text"
            fullWidth={true}
            name="country"
            placeholder="Que recherchez-vous ?"
            leadingIcon="search"
            options={countriesOptions}
            control={control}
            error={errors?.country?.message}
          />
        </div>

        <Button onClick={() => setOpenCategoryDownModal(true)}>Filtrer catégorie</Button>

        {allShoppingProducts.map((product) => (
          <button
            key={product.id}
            className="mt-1 w-full bg-red-500"
            onClick={() => onClickProductToRemove(product.id)}
          >
            {product.name}
          </button>
        ))}

        <Button
          type="submit"
          onClick={() => onSubmit}
          disabled={!allShoppingProducts.length}
          className={{ 'absolute bottom-6 self-center': true }}
        >
          Valider les marchandises
        </Button>
      </DeclarationSteps>

      <ModalSearchProduct
        open={openSearchDownModal}
        onClose={handleCloseDownModal}
        onClickProduct={onClickProduct}
        onSearchAll={onSearchAll}
      />
      <ModalCategoryProduct
        open={openCategoryDownModal}
        onClose={handleCloseDownModal}
        defaultCurrency={defaultCurrency}
      />
    </AgentRoute>
  );
};

export default declaration(Declaration);
