import type { Alpha2Code } from 'i18n-iso-countries';
import {
  DeclarationEntityInterface,
  DeclarationStatus,
} from '../../../entities/declaration.entity';
import { CurrencyRepositoryInterface } from '../../../repositories/currency.repository';
import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';
import { ProductRepositoryInterface } from '../../../repositories/product.repository';
import { AuthorType } from '../../common/enums/author.enum';
import { MeansOfTransport } from '../../common/enums/meansOfTransport.enum';
import { generateDeclaration } from '../../common/services/declaration';
import { getTaxesDataFromDeclaration } from '../../common/services/declaration/getTaxesDataFromDeclaration.service';
import { ShoppingProduct } from '../../common/services/shoppingProducts';
import declarationCreateForbiddenError from '../../common/errors/declarationCreateForbidden.error';
import { config } from '../../../loader/config';
import { buildDeclarationUrl } from '../../../utils/frontUrls.util';
import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { getProductsDeclarationFromDeclaration } from './services/products.service';
import { generatePublicId } from './services/publicId.service';
import { buildCheckDeclarationEmailRenderer } from './emailRenderer';

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
  authorType: AuthorType;
  declarantAddressStreet: string;
  declarantAddressPostalCode: string;
  declarantAddressCity: string;
  declarantEmail: string;
  declarantPhoneNumber: string | null;
  declarantFirstName: string;
  declarantLastName: string;
  eventEmitter: CustomEventEmitterInterface;
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
  authorType,
  declarantAddressStreet,
  declarantAddressPostalCode,
  declarantAddressCity,
  declarantEmail,
  declarantPhoneNumber,
  declarantFirstName,
  declarantLastName,
  eventEmitter,
}: DeclarationOptions): Promise<void> => {
  const publicId = generatePublicId();
  const declaration = await generateDeclaration({
    shoppingProducts,
    productRepository,
    currencyRepository,
    border,
    age,
    country,
    meanOfTransport,
  });

  if (!declaration.canCreateDeclaration()) {
    throw declarationCreateForbiddenError();
  }

  const declarationEntity: DeclarationEntityInterface = {
    id: declarationId,
    canCalculateTaxes: declaration.canCalculateTaxes(),
    publicId,
    products: getProductsDeclarationFromDeclaration(declaration),
    authorEmail,
    authorId,
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

  const declarationInDatabase = await declarationRepository.getOne(declarationId);

  await declarationRepository.createOne(declarationEntity);

  if (!declarationInDatabase) {
    const checkDeclarationHtml = await buildCheckDeclarationEmailRenderer({
      siteUrl: config.URL_FRONTEND,
      declarationDetailsUrl: buildDeclarationUrl(declarationId),
    });

    eventEmitter.emitSendEmail({
      to: declarantEmail,
      html: checkDeclarationHtml,
      subject: 'Confirmation de traitement de votre déclaration',
    });
  }
};
