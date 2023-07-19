import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeclarationPrecision1685977857638 implements MigrationInterface {
  name = 'AddDeclarationPrecision1685977857638';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "declarantAddress"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "publicId" character(21) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD CONSTRAINT "UQ_96e751f9f3d9b0f284db3a41e18" UNIQUE ("publicId")
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "declarantAddressStreet" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "declarantAddressPostalCode" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "declarantAddressCity" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "declarantPhoneNumber" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "declarantPhoneNumber"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "declarantAddressCity"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "declarantAddressPostalCode"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "declarantAddressStreet"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP CONSTRAINT "UQ_96e751f9f3d9b0f284db3a41e18"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration" DROP COLUMN "publicId"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ADD "declarantAddress" character varying NOT NULL
        `);
  }
}
