import { Repository } from 'typeorm';
import { DeclarationEntity, DeclarationEntityInterface, PaymentStatus } from '../entities/declaration.entity';
import { AppDataSource } from '../loader/database';
import DeclarationQueryBuilder from './queryBuilders/declaration.queryBuilder';

interface GetAllOptions {
  limit: number;
  offset: number;
  search?: string;
  searchPublicId?: string;
  status?: string;
  meanOfTransports?: string;
  startDate?: Date;
  endDate?: Date;
}

export type UpdateDeclaration = Partial<Omit<DeclarationEntityInterface, 'id'>>;

export type DeclarationRepositoryInterface = {
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface>;
  getOne(declarationId: string): Promise<DeclarationEntityInterface | null>;
  updateOne(declarationId: string, declaration: UpdateDeclaration): Promise<void>;
  getAll(options: GetAllOptions): Promise<DeclarationEntityInterface[]>;
  getOneWithPublicId(publicDeclarationId: string): Promise<DeclarationEntityInterface | null>;
  canMakePayment(declarationId: string): Promise<boolean>;
  validatePayment(declarationId: string): Promise<void>;
  rejectPayment(declarationId: string): Promise<void>;
  getPaymentStatus(declarationId: string): Promise<string>;
} & Repository<DeclarationEntity>;

export const DeclarationRepository: DeclarationRepositoryInterface = AppDataSource.getRepository(
  DeclarationEntity,
).extend({
  declarationQueryBuilder(): DeclarationQueryBuilder {
    return new DeclarationQueryBuilder(this.createQueryBuilder('declaration'));
  },
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface> {
    return this.save(declaration);
  },
  getOne(declarationId: string): Promise<DeclarationEntityInterface | null> {
    return this.createQueryBuilder('declaration')
      .addSelect('declaration.products')
      .where('declaration.id = :declarationId', {
        declarationId,
      })
      .getOne();
  },
  async updateOne(declarationId, declaration) {
    await this.createQueryBuilder('declaration')
      .update(DeclarationEntity)
      .set(declaration)
      .where({ id: declarationId })
      .execute();
  },
  getOneWithPublicId(publicDeclarationId: string): Promise<DeclarationEntityInterface | null> {
    return this.createQueryBuilder('declaration')
      .addSelect('declaration.products')
      .where('declaration.publicId = :publicDeclarationId', {
        publicDeclarationId,
      })
      .getOne();
  },
  getAll({
    limit,
    offset,
    search,
    searchPublicId,
    status,
    meanOfTransports,
    startDate,
    endDate,
  }: GetAllOptions): Promise<DeclarationEntityInterface[]> {
    const query = this.declarationQueryBuilder()
      .addSelect('declaration.products')
      .whereSearch(search)
      .whereStatus(status)
      .whereMeanOfTransports(meanOfTransports)
      .whereStartDate(startDate)
      .whereEndDate(endDate)
      .whereSearchPublicId(searchPublicId)
      .orderBy('declaration.versionDate', 'DESC')
      .limit(limit)
      .offset(offset);

    return query.getMany();
  },
  async validatePayment(declarationId: string): Promise<void> {
    await this.createQueryBuilder('declaration')
      .update(DeclarationEntity)
      .set({ paymentStatus: PaymentStatus.VALIDATED })
      .where('declaration.id = :declarationId', { declarationId })
      .execute();
  },
  async rejectPayment(declarationId: string): Promise<void> {
    await this.createQueryBuilder('declaration')
      .update(DeclarationEntity)
      .set({ paymentStatus: PaymentStatus.REFUSED })
      .where('declaration.id = :declarationId', { declarationId })
      .execute();
  },
  async canMakePayment(declarationId: string): Promise<boolean> {
    const declaration = await this.createQueryBuilder('declaration')
      .select('declaration.canCalculateTaxes')
      .where('declaration.id = :declarationId', { declarationId })
      .getOne();

    return declaration?.canCalculateTaxes ?? false;
  },
  async getPaymentStatus(declarationId: string): Promise<string> {
    const declaration = await this.createQueryBuilder('declaration')
      .select('declaration.status')
      .where('declaration.id = :declarationId', { declarationId })
      .getOne();

    return declaration?.status ?? 'unknown';
  },
});
