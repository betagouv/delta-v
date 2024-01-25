import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterFavoriteTable1706028299978 implements MigrationInterface {
  name = 'AlterFavoriteTable1706028299978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD "name" character varying(255) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "favorite" DROP COLUMN "name"
        `);
  }
}
