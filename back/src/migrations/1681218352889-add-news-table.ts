import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewsTable1681218352889 implements MigrationInterface {
  name = 'AddNewsTable1681218352889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "news" ("id" uuid NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "creationDate" TIMESTAMP NOT NULL, "tags" text NOT NULL DEFAULT '', CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "news"`);
  }
}
