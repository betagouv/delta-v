import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableCurrency1667051818123 implements MigrationInterface {
  name = 'AddTableCurrency1667051818123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "currency" ("id" character(3) NOT NULL, "name" character varying NOT NULL, "value" double precision NOT NULL, "comment" text, "updateDate" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "currency"`);
  }
}
