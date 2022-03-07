import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaxesFieldsProducts1646585191650 implements MigrationInterface {
  name = 'AddTaxesFieldsProducts1646585191650';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "nomenclatures" text`);
    await queryRunner.query(`ALTER TABLE "product" ADD "customDuty" double precision`);
    await queryRunner.query(`ALTER TABLE "product" ADD "vat" double precision`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "vat"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customDuty"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "nomenclatures"`);
  }
}
