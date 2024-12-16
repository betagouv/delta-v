import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoudedAndAmountTaxes1734339736176 implements MigrationInterface {
  name = 'AddRoudedAndAmountTaxes1734339736176';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);

    // Colonnes qui nécessitent une mise à jour - sans NOT NULL initialement
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalTaxesRoundedAmount" double precision
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalTaxesValueAmount" double precision
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalTaxesValueRoundedAmount" double precision
        `);

    // Colonnes avec valeur par défaut - NOT NULL direct
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalTobaccoTaxAmount" double precision NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalAlcoholTaxAmount" double precision NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalTobaccoTaxRoundedAmount" double precision NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "totalAlcoholTaxRoundedAmount" double precision NOT NULL DEFAULT '0'
        `);

    // Faire les mises à jour
    await queryRunner.query(`
            UPDATE "declaration"
            SET "totalTaxesValueAmount" = "totalTaxesAmount"
        `);
    await queryRunner.query(`
            UPDATE "declaration"
            SET "totalTaxesRoundedAmount" = ROUND("totalTaxesAmount")
        `);
    await queryRunner.query(`
            UPDATE "declaration"
            SET "totalTaxesValueRoundedAmount" = ROUND("totalTaxesValueAmount")
        `);

    // Ajouter les contraintes NOT NULL pour les colonnes mises à jour
    await queryRunner.query(`
            ALTER TABLE "declaration" 
            ALTER COLUMN "totalTaxesRoundedAmount" SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" 
            ALTER COLUMN "totalTaxesValueAmount" SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" 
            ALTER COLUMN "totalTaxesValueRoundedAmount" SET NOT NULL
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
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "totalTaxesRoundedAmount"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying
        `);
  }
}
