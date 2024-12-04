import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableDeclarationAddTotalTaxesRoundedForAlcoholAndTobacco1733240470079
  implements MigrationInterface
{
  name = 'AlterTableDeclarationAddTotalTaxesRoundedForAlcoholAndTobacco1733240470079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalTobaccoTaxAmount" double precision NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalAlcoholTaxAmount" double precision NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalTobaccoTaxRoundedAmount" double precision NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalAlcoholTaxRoundedAmount" double precision NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalTaxesValueAmount" double precision NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalTaxesValueRoundedAmount" double precision NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "totalTaxesValueRoundedAmount"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "totalTaxesValueAmount"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "totalAlcoholTaxRoundedAmount"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "totalTobaccoTaxRoundedAmount"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "totalAlcoholTaxAmount"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "totalTobaccoTaxAmount"
        `);
  }
}
