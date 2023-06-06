import { Alpha2Code } from 'i18n-iso-countries';
import {
  DeclarationEntityInterface,
  DeclarationStatus,
} from '../../../entities/declaration.entity';
import { CurrencyRepositoryInterface } from '../../../repositories/currency.repository';
import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';
import { ProductRepositoryInterface } from '../../../repositories/product.repository';
import { AuthorType } from '../../common/enums/author.enum';
import { MeansOfTransport } from '../../common/enums/meansOfTransport.enum';
import { Declaration, generateDeclaration } from '../../common/services/declaration';
import { getTaxesDataFromDeclaration } from '../../common/services/declaration/getTaxesDataFromDeclaration.service';
import { ShoppingProduct } from '../../common/services/shoppingProducts';
import { getProductsDeclarationFromDeclaration } from './services/products.service';
import { generatePublicId } from './services/publicId.service';

interface DeclarationOptions {
  declarationId: string;
  productRepository: ProductRepositoryInterface;
  currencyRepository: CurrencyRepositoryInterface;
  declarationRepository: DeclarationRepositoryInterface;
  border: boolean;
  age: number;
  country: Alpha2Code;
  meanOfTransport?: MeansOfTransport;
  shoppingProducts: ShoppingProduct[];
  authorEmail: string;
  authorId?: string;
  authorFullName: string;
  authorType: AuthorType;
  declarantAddressStreet: string;
  declarantAddressPostalCode: string;
  declarantAddressCity: string;
  declarantEmail: string;
  declarantPhoneNumber: string | null;
  declarantFirstName: string;
  declarantLastName: string;
}

export const service = async ({
  declarationId,
  productRepository,
  currencyRepository,
  declarationRepository,
  border,
  age,
  country,
  meanOfTransport,
  shoppingProducts,
  authorEmail,
  authorId,
  authorFullName,
  authorType,
  declarantAddressStreet,
  declarantAddressPostalCode,
  declarantAddressCity,
  declarantEmail,
  declarantPhoneNumber,
  declarantFirstName,
  declarantLastName,
}: DeclarationOptions): Promise<Declaration> => {
  const declaration = await generateDeclaration({
    shoppingProducts,
    productRepository,
    currencyRepository,
    border,
    age,
    country,
    meanOfTransport,
  });

  const declarationEntity: DeclarationEntityInterface = {
    id: declarationId,
    publicId: generatePublicId(),
    products: getProductsDeclarationFromDeclaration(declaration),
    authorEmail,
    authorId,
    authorFullName,
    authorType,
    status: DeclarationStatus.SUBMITTED,
    versionDate: new Date(),
    history: [],
    declarantMeanOfTransport: meanOfTransport,
    declarantCountry: country,
    declarantAge: age,
    declarantBorder: border,
    declarantAddressStreet,
    declarantAddressPostalCode,
    declarantAddressCity,
    declarantEmail,
    declarantPhoneNumber,
    declarantFirstName,
    declarantLastName,
    ...getTaxesDataFromDeclaration(declaration),
  };

  await declarationRepository.createOne(declarationEntity);

  return declaration;
};
