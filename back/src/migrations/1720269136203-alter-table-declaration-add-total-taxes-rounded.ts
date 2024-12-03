import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableDeclarationAddTotalTaxesRounded1720269136203 implements MigrationInterface {
  name = 'AlterTableDeclarationAddTotalTaxesRounded1720269136203';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalTaxesRoundedAmount" double precision NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "totalTaxesRoundedAmount"
        `);
  }
}
