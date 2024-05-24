import type { Alpha2Code } from 'i18n-iso-countries';
import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { AuthorType } from '../api/common/enums/author.enum';
import { MeansOfTransport } from '../api/common/enums/meansOfTransport.enum';
import { AmountProduct } from '../api/common/services/amountProducts/globalAmount.service';

export enum DeclarationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  VALIDATED = 'validated',
  PAID = 'paid',
  REFUSED_ERROR = 'refused-error',
  REFUSED_LITIGATION = 'refused-litigation',
  SWITCH_PAPER = 'switch-paper',
}

export enum ProductStatus {
  VALUE_PRODUCT = 'value-product',
  AMOUNT_PRODUCT = 'amount-product',
  CUSTOM_PRODUCT = 'custom-product',
}

export interface VersionData {
  versionDate: Date;
  authorType: AuthorType;
  authorEmail: string;
  authorId?: string;
  status: DeclarationStatus;
  canCalculateTaxes: boolean;
}

export interface DeclarantData {
  declarantFirstName: string;
  declarantLastName: string;
  declarantAddressStreet: string;
  declarantAddressPostalCode: string;
  declarantAddressCity: string;
  declarantEmail: string;
  declarantPhoneNumber: string | null;
  declarantBorder: boolean;
  declarantAge: number;
  declarantCountry: Alpha2Code;
  declarantMeanOfTransport?: MeansOfTransport;
}

export interface TaxesData {
  totalVatAmount: number;
  totalCustomDutyAmount: number;
  totalTaxesAmount: number;
  franchiseAmount: number;
  totalAmount: number;
}

export interface DeclarationVersion extends VersionData {
  products: ProductDeclaration[];
  declarationData: DeclarantData;
  taxesData: TaxesData;
}

export interface ProductDeclaration {
  id?: string;
  status: ProductStatus;
  amountProduct?: AmountProduct;
  customId: string;
  name?: string;
  customName?: string;
  originalValue: number;
  currency?: string;
  rateCurrency: number;
  value: number;
  customDuty: number;
  vat: number;
  calculatedCustomDuty: number;
  calculatedVat: number;
  calculatedTaxes: number;
  notManagedProduct: boolean;
}

export interface DeclarationEntityInterface extends VersionData, DeclarantData, TaxesData {
  id: string;
  publicId: string;
  products: ProductDeclaration[];
  history?: DeclarationVersion[];
}

@Entity('declaration')
@Unique('publicId', ['publicId'])
export class DeclarationEntity implements DeclarationEntityInterface {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 21, unique: true })
  publicId: string;

  @Column({ type: 'jsonb', select: false })
  products: ProductDeclaration[];

  @Column({ type: 'jsonb', select: false, nullable: true, default: [] })
  history?: DeclarationVersion[];

  @Column({ type: 'timestamp' })
  versionDate: Date;

  @Column({
    type: 'enum',
    nullable: false,
    default: AuthorType.user,
    enum: AuthorType,
    select: false,
  })
  authorType: AuthorType;

  @Column({ type: 'varchar' })
  authorEmail: string;

  @Column({ type: 'varchar', nullable: true })
  authorId?: string;

  @Column({
    type: 'enum',
    nullable: false,
    default: DeclarationStatus.DRAFT,
    enum: DeclarationStatus,
  })
  status: DeclarationStatus;

  @Column({ type: 'boolean', default: true })
  canCalculateTaxes: boolean;

  @Column({ type: 'varchar' })
  declarantFirstName: string;

  @Column({ type: 'varchar' })
  declarantLastName: string;

  @Column({ type: 'varchar' })
  declarantAddressStreet: string;

  @Column({ type: 'varchar' })
  declarantAddressPostalCode: string;

  @Column({ type: 'varchar' })
  declarantAddressCity: string;

  @Column({ type: 'varchar' })
  declarantEmail: string;

  @Column({ type: 'varchar', nullable: true })
  declarantPhoneNumber: string | null;

  @Column({ type: 'boolean' })
  declarantBorder: boolean;

  @Column({ type: 'integer' })
  declarantAge: number;

  @Column({ type: 'varchar' })
  declarantCountry: Alpha2Code;

  @Column({ type: 'varchar', nullable: true })
  declarantMeanOfTransport?: MeansOfTransport;

  @Column({ type: 'float' })
  totalVatAmount: number;

  @Column({ type: 'float' })
  totalCustomDutyAmount: number;

  @Column({ type: 'float' })
  totalTaxesAmount: number;

  @Column({ type: 'float' })
  franchiseAmount: number;

  @Column({ type: 'float' })
  totalAmount: number;
}
