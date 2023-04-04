import { Alpha2Code } from 'i18n-iso-countries';
import {
  DeclarationEntityInterface,
  DeclarationStatus,
  DeclarationVersion,
  ProductDeclaration,
} from '../../../entities/declaration.entity';
import { Product, ProductDisplayTypes, ProductType } from '../../../entities/product.entity';
import { sortProducts } from '../../../utils/product.util';
import { AuthorType } from '../../common/enums/author.enum';
import { MeansOfTransport } from '../../common/enums/meansOfTransport.enum';
import { AmountProduct } from '../../common/services/amountProducts/globalAmount.service';

export interface SerializedProduct {
  id: string;
  name: string;
  icon?: string;
  info?: string;
  radioValue?: string;
  finalProduct: boolean;
  productType: ProductType;
  amountProduct?: AmountProduct;
  countries: string[];
  productDisplayTypes: ProductDisplayTypes;
  childrenQuestion?: string;
  customDuty?: number;
  vat?: number;
  nomenclatures?: string[];
  subProducts?: SerializedProduct[];
  relatedWords: string[];
}

export const productSerializer = (product: Product): SerializedProduct => ({
  id: product.id,
  name: product.name,
  icon: product.icon,
  radioValue: product.radioValue,
  finalProduct: product.finalProduct,
  amountProduct: product.amountProduct,
  productType: product.productType,
  productDisplayTypes: product.productDisplayTypes,
  countries: product.countries,
  info: product.info,
  childrenQuestion: product.childrenQuestion,
  customDuty: product.customDuty,
  vat: product.vat,
  nomenclatures: product.nomenclatures,
  relatedWords: product.relatedWords,
  subProducts: product.subProducts?.sort(sortProducts).map(productSerializer),
});

export interface SerializedDeclaration {
  id: string;
  products: ProductDeclaration[];
  history?: DeclarationVersion[];
  versionDate: Date;
  authorType: AuthorType;
  authorFullName: string;
  authorEmail: string;
  authorId?: string;
  status: DeclarationStatus;
  declarantFirstName: string;
  declarantLastName: string;
  declarantAddress: string;
  declarantEmail: string;
  declarantBorder: boolean;
  declarantAge: number;
  declarantCountry: Alpha2Code;
  declarantMeanOfTransport?: MeansOfTransport;
  totalVatAmount: number;
  totalCustomDutyAmount: number;
  totalTaxesAmount: number;
  franchiseAmount: number;
  totalAmount: number;
}

export const declarationSerializer = (
  declaration: DeclarationEntityInterface,
): SerializedDeclaration => ({
  id: declaration.id,
  products: declaration.products,
  history: declaration.history,
  versionDate: declaration.versionDate,
  authorType: declaration.authorType,
  authorFullName: declaration.authorFullName,
  authorEmail: declaration.authorEmail,
  authorId: declaration.authorId,
  status: declaration.status,
  declarantFirstName: declaration.declarantFirstName,
  declarantLastName: declaration.declarantLastName,
  declarantAddress: declaration.declarantAddress,
  declarantEmail: declaration.declarantEmail,
  declarantBorder: declaration.declarantBorder,
  declarantAge: declaration.declarantAge,
  declarantCountry: declaration.declarantCountry,
  declarantMeanOfTransport: declaration.declarantMeanOfTransport,
  totalVatAmount: declaration.totalVatAmount,
  totalCustomDutyAmount: declaration.totalCustomDutyAmount,
  totalTaxesAmount: declaration.totalTaxesAmount,
  franchiseAmount: declaration.franchiseAmount,
  totalAmount: declaration.totalAmount,
});
