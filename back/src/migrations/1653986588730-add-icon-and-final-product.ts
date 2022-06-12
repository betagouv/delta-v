import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIconAndFinalProduct1653986588730 implements MigrationInterface {
  name = 'AddIconAndFinalProduct1653986588730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "icon" character varying`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "finalProduct" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "finalProduct"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "icon"`);
  }
}
