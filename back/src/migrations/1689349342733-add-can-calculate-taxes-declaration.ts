import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCanCalculateTaxesDeclaration1689349342733 implements MigrationInterface {
  name = 'AddCanCalculateTaxesDeclaration1689349342733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "canCalculateTaxes" boolean NOT NULL DEFAULT true
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "canCalculateTaxes"
        `);
  }
}
