import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeclaration1674468346440 implements MigrationInterface {
  name = 'AddDeclaration1674468346440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."declaration_authortype_enum" AS ENUM('user', 'agent')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."declaration_status_enum" AS ENUM('draft', 'submitted', 'validated', 'refused')`,
    );
    await queryRunner.query(
      `CREATE TABLE "declaration" ("id" uuid NOT NULL, "products" jsonb NOT NULL, "history" jsonb, "versionDate" TIMESTAMP NOT NULL, "authorType" "public"."declaration_authortype_enum" NOT NULL DEFAULT 'user', "authorFullName" character varying NOT NULL, "authorEmail" character varying NOT NULL, "authorId" character varying, "status" "public"."declaration_status_enum" NOT NULL DEFAULT 'draft', "declarantFirstName" character varying NOT NULL, "declarantLastName" character varying NOT NULL, "declarantAddress" character varying NOT NULL, "declarantEmail" character varying NOT NULL, "declarantBorder" boolean NOT NULL, "declarantAge" integer NOT NULL, "declarantCountry" character varying NOT NULL, "declarantMeanOfTransport" character varying, "totalVatAmount" double precision NOT NULL, "totalCustomDutyAmount" double precision NOT NULL, "totalTaxesAmount" double precision NOT NULL, CONSTRAINT "PK_162458b77df5671bc1cd2df4fa7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "declaration"`);
    await queryRunner.query(`DROP TYPE "public"."declaration_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."declaration_authortype_enum"`);
  }
}
