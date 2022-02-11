import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1644491470205 implements MigrationInterface {
  name = 'Test1644491470205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "test" ("id" uuid NOT NULL, CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `INSERT INTO "test" ("id") VALUES ('00000000-0000-0000-0000-000000000000')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "test"`);
  }
}
