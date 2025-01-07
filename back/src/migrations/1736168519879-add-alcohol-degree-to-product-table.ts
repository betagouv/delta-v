import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAlcoholDegreeToProductTable1736168519879 implements MigrationInterface {
  name = 'AddAlcoholDegreeToProductTable1736168519879';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD "alcoholDegree" double precision
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "alcoholDegree"
        `);
  }
}
