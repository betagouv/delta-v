import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultHitoryToEmptyArray1687536079784 implements MigrationInterface {
  name = 'DefaultHitoryToEmptyArray1687536079784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ALTER COLUMN "history"
            SET DEFAULT '[]'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ALTER COLUMN "history" DROP DEFAULT
        `);
  }
}
