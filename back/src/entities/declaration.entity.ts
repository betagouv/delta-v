import { Alpha2Code } from 'i18n-iso-countries';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MeansOfTransport } from '../api/common/enums/meansOfTransport.enum';

export enum AuthorType {
  user = 'user',
  agent = 'agent',
}

export enum DeclarationStatus {
  draft = 'draft',
  submitted = 'submitted',
  validated = 'validated',
  refused = 'refused',
}

interface VersionData {
  versionDate: Date;
  authorType: AuthorType;
  authorFullName: string;
  authorEmail: string;
  authorId?: string;
  status: DeclarationStatus;
}

interface DeclarantData {
  declarantFirstName: string;
  declarantLastName: string;
  declarantAddress: string;
  declarantEmail: string;
  declarantBorder: boolean;
  declarantAge: number;
  declarantCountry: Alpha2Code;
  declarantMeanOfTransport?: MeansOfTransport;
}

interface TaxesData {
  totalVatAmount: number;
  totalCustomDutyAmount: number;
  totalTaxesAmount: number;
}

interface DeclarationVersion extends VersionData {
  products: ProductDeclaration[];
  declarationData: DeclarantData;
  taxesData: TaxesData;
}

interface ProductDeclaration {
  id?: string;
  customId: string;
  name?: string;
  customName?: string;
  originalValue: number;
  currency?: string;
  value: number;
}

interface Declaration extends VersionData, DeclarantData, TaxesData {
  id: string;
  products: ProductDeclaration[];
  history?: DeclarationVersion[];
}

@Entity('declaration')
export class DeclarationEntity implements Declaration {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'jsonb', select: false })
  products: ProductDeclaration[];

  @Column({ type: 'jsonb', select: false, nullable: true })
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
  authorFullName: string;

  @Column({ type: 'varchar' })
  authorEmail: string;

  @Column({ type: 'varchar', nullable: true })
  authorId?: string;

  @Column({
    type: 'enum',
    nullable: false,
    default: DeclarationStatus.draft,
    enum: DeclarationStatus,
  })
  status: DeclarationStatus;

  @Column({ type: 'varchar' })
  declarantFirstName: string;

  @Column({ type: 'varchar' })
  declarantLastName: string;

  @Column({ type: 'varchar' })
  declarantAddress: string;

  @Column({ type: 'varchar' })
  declarantEmail: string;

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
}