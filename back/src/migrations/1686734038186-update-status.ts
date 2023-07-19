import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStatus1686734038186 implements MigrationInterface {
  name = 'UpdateStatus1686734038186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TYPE "public"."declaration_status_enum" RENAME VALUE 'refused' TO 'refused-error'; 
        `);
    await queryRunner.query(`
                ALTER TYPE "public"."declaration_status_enum" ADD VALUE 'refused-litigation' AFTER 'refused-error'; 
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE "public"."declaration_status_enum_old" AS ENUM(
            'draft',
            'submitted',
            'validated',
            'paid',
            'refused'
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "declaration"
        ALTER COLUMN "status" DROP DEFAULT
    `);
    await queryRunner.query(`
        ALTER TABLE "declaration"
        ALTER COLUMN "status" TYPE "public"."declaration_status_enum_old" USING "status"::"text"::"public"."declaration_status_enum_old"
    `);
    await queryRunner.query(`
        ALTER TABLE "declaration"
        ALTER COLUMN "status"
        SET DEFAULT 'draft'
    `);
    await queryRunner.query(`
        DROP TYPE "public"."declaration_status_enum"
    `);
    await queryRunner.query(`
        ALTER TYPE "public"."declaration_status_enum_old"
        RENAME TO "declaration_status_enum"
    `);
  }
}
