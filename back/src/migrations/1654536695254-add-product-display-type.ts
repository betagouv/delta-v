import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductDisplayType1654536695254 implements MigrationInterface {
  name = 'AddProductDisplayType1654536695254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."product_productdisplaytypes_enum" AS ENUM('category', 'not-managed', 'addable', 'radio', 'radio-card')`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "productDisplayTypes" "public"."product_productdisplaytypes_enum" NOT NULL DEFAULT 'category'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "productDisplayTypes"`);
    await queryRunner.query(`DROP TYPE "public"."product_productdisplaytypes_enum"`);
  }
}
