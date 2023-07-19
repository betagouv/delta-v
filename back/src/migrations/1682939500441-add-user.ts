import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1682939500441 implements MigrationInterface {
  name = 'AddUser1682939500441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "enabled" boolean NOT NULL DEFAULT false,
                "blocked" boolean NOT NULL DEFAULT false,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
