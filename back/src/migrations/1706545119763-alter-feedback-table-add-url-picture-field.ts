import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterFeedbackTableAddUrlPictureField1706545119763 implements MigrationInterface {
  name = 'AlterFeedbackTableAddUrlPictureField1706545119763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "feedback"
            ADD "pictureUrl" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "feedback" DROP COLUMN "pictureUrl"
        `);
  }
}
