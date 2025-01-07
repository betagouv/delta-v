import { Alpha2Code } from 'i18n-iso-countries';
import { ProductTaxesInterface } from '../../../entities/productTaxes.entity';
import { CurrencyRepositoryInterface } from '../../../repositories/currency.repository';
import { ProductRepositoryInterface } from '../../../repositories/product.repository';
import { MeansOfTransport } from '../../common/enums/meansOfTransport.enum';
import { AmountGroup } from '../../common/services/amountProducts/globalAmount.service';
import { generateDeclaration } from '../../common/services/declaration';
import { ShoppingProduct } from '../../common/services/shoppingProducts';
import { TravelerData } from '../../common/services/traveler';

interface SimulateServiceOptions {
  productRepository: ProductRepositoryInterface;
  currencyRepository: CurrencyRepositoryInterface;
  border: boolean;
  age: number;
  country: Alpha2Code;
  meanOfTransport?: MeansOfTransport;
  shoppingProducts: ShoppingProduct[];
}

interface SimulateServiceResponse {
  valueProducts: ProductTaxesInterface[];
  customProducts: ProductTaxesInterface[];
  amountProducts: AmountGroup[];
  franchiseAmount: number;
  canCalculateTaxes: boolean;
  travelerData: TravelerData;
}

export const service = async ({
  productRepository,
  currencyRepository,
  border,
  age,
  country,
  meanOfTransport,
  shoppingProducts,
}: SimulateServiceOptions): Promise<SimulateServiceResponse> => {
  console.log('🚀 ~ shoppingProducts:', shoppingProducts);
  const declaration = await generateDeclaration({
    shoppingProducts,
    productRepository,
    currencyRepository,
    border,
    age,
    country,
    meanOfTransport,
  });
  return {
    valueProducts: declaration.getRealProductsTaxes(),
    customProducts: declaration.uncompletedRealProductsTaxes,
    amountProducts: declaration.getAmountProductsGrouped(),
    franchiseAmount: declaration.franchiseAmount,
    canCalculateTaxes: declaration.canCalculateTaxes(),
    travelerData: declaration.inputDeclaration.travelerData,
  };
};
