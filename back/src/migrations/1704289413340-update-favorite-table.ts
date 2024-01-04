import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFavoriteTable1704289413340 implements MigrationInterface {
  name = 'UpdateFavoriteTable1704289413340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "search_product_history"
            ADD "searchValue" text
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "search_product_history" DROP COLUMN "searchValue"
        `);
  }
}
