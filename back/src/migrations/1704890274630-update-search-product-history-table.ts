import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSearchProductHistoryTable1704890274630 implements MigrationInterface {
  name = 'UpdateSearchProductHistoryTable1704890274630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "search_product_history"
            ALTER COLUMN "searchValue"
            SET NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "search_product_history"
            ALTER COLUMN "searchValue" DROP NOT NULL
        `);
  }
}
