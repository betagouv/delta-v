import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUserRemovePassword1728221772281 implements MigrationInterface {
  name = 'AlterTableUserRemovePassword1728221772281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying NOT NULL
        `);
  }
}
