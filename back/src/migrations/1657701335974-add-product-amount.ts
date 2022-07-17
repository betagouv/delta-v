import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductAmount1657701335974 implements MigrationInterface {
  name = 'AddProductAmount1657701335974';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."product_producttype_enum" AS ENUM('amount', 'value')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "productType" "public"."product_producttype_enum" NOT NULL DEFAULT 'value'`,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "amountProduct" character varying`);
    await queryRunner.query(`ALTER TABLE "product" ADD "countries" text NOT NULL DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "countries"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "amountProduct"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "productType"`);
    await queryRunner.query(`DROP TYPE "public"."product_producttype_enum"`);
  }
}
