import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductPositionRank1656630497288 implements MigrationInterface {
  name = 'AddProductPositionRank1656630497288';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "positionRank" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "positionRank"`);
  }
}
