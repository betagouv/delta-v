import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNanoIdSize1688718659525 implements MigrationInterface {
  name = 'ChangeNanoIdSize1688718659525';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration" ALTER COLUMN "publicId" TYPE character varying(21)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "declaration" ALTER COLUMN "publicId" TYPE character(21)
        `);
  }
}
