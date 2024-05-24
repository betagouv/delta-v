import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConfigTable1716303894980 implements MigrationInterface {
  name = 'CreateConfigTable1716303894980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "config" (
                "userId" uuid NOT NULL,
                "defaultCountry" character varying,
                CONSTRAINT "PK_edea9a663f93bd4dd32b2877451" PRIMARY KEY ("userId")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "config"
            ADD CONSTRAINT "FK_edea9a663f93bd4dd32b2877451" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "config" DROP CONSTRAINT "FK_edea9a663f93bd4dd32b2877451"
        `);
    await queryRunner.query(`
            DROP TABLE "config"
        `);
  }
}
