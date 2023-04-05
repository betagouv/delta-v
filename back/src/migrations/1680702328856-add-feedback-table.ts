import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFeedbackTable1680702328856 implements MigrationInterface {
  name = 'AddFeedbackTable1680702328856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "feedback" ("id" uuid NOT NULL, "userId" uuid, "comment" text NOT NULL, "email" character varying, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "feedback"`);
  }
}
