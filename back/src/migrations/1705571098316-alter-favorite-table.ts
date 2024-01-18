import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterFavoriteTable1705571098316 implements MigrationInterface {
  name = 'AlterFavoriteTable1705571098316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD "name" character varying(255)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "favorite" DROP COLUMN "name"
        `);
  }
}
