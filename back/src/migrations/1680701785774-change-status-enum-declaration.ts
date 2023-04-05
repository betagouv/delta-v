import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeStatusEnumDeclaration1680701785774 implements MigrationInterface {
  name = 'changeStatusEnumDeclaration1680701785774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."declaration_status_enum" RENAME TO "declaration_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."declaration_status_enum" AS ENUM('draft', 'submitted', 'validated', 'paid', 'refused')`,
    );
    await queryRunner.query(`ALTER TABLE "declaration" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "declaration" ALTER COLUMN "status" TYPE "public"."declaration_status_enum" USING "status"::"text"::"public"."declaration_status_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "declaration" ALTER COLUMN "status" SET DEFAULT 'draft'`);
    await queryRunner.query(`DROP TYPE "public"."declaration_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."declaration_status_enum_old" AS ENUM('draft', 'submitted', 'validated', 'refused')`,
    );
    await queryRunner.query(`ALTER TABLE "declaration" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "declaration" ALTER COLUMN "status" TYPE "public"."declaration_status_enum_old" USING "status"::"text"::"public"."declaration_status_enum_old"`,
    );
    await queryRunner.query(`ALTER TABLE "declaration" ALTER COLUMN "status" SET DEFAULT 'draft'`);
    await queryRunner.query(`DROP TYPE "public"."declaration_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."declaration_status_enum_old" RENAME TO "declaration_status_enum"`,
    );
  }
}
