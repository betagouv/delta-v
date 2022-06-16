import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRadioValues1655282294153 implements MigrationInterface {
  name = 'AddRadioValues1655282294153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "radioValue" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "radioValue"`);
  }
}
