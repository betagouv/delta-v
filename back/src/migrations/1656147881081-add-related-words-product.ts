import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelatedWordsProduct1656147881081 implements MigrationInterface {
  name = 'AddRelatedWordsProduct1656147881081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "relatedWords" text NOT NULL DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "relatedWords"`);
  }
}
