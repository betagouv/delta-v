import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaxesFieldsProducts1646064354600 implements MigrationInterface {
  name = 'AddTaxesFieldsProducts1646064354600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "nomenclatures" text`);
    await queryRunner.query(`ALTER TABLE "product" ADD "customDuty" numeric`);
    await queryRunner.query(`ALTER TABLE "product" ADD "vat" numeric`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "vat"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customDuty"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "nomenclatures"`);
  }
}
