import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteAuthorFullName1687438097418 implements MigrationInterface {
  name = 'DeleteAuthorFullName1687438097418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "authorFullName"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "authorFullName" character varying NOT NULL
        `);
  }
}
