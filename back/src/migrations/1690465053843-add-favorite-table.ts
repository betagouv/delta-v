import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFavoriteTable1690465053843 implements MigrationInterface {
  name = 'AddFavoriteTable1690465053843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "favorite" (
                "userId" uuid NOT NULL,
                "productId" uuid NOT NULL,
                CONSTRAINT "PK_f0e7bf803aa937033d10dc07ed4" PRIMARY KEY ("userId", "productId")
            )
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."declaration_status_enum"
            RENAME TO "declaration_status_enum_old"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."declaration_status_enum" AS ENUM(
                'draft',
                'submitted',
                'validated',
                'paid',
                'refused-error',
                'refused-litigation',
                'switch-paper'
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ALTER COLUMN "status" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ALTER COLUMN "status" TYPE "public"."declaration_status_enum" USING "status"::"text"::"public"."declaration_status_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "declaration"
            ALTER COLUMN "status"
            SET DEFAULT 'draft'
        `);
    await queryRunner.query(`
            DROP TYPE "public"."declaration_status_enum_old"
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD CONSTRAINT "FK_b8e337759b77baa0a4055d1894e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite" DROP CONSTRAINT "FK_b8e337759b77baa0a4055d1894e"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."declaration_status_enum_old" AS ENUM(
                'draft',
                'submitted',
                'validated',
                'paid',
                'refused-error',
                'refused-litigation'
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
    await queryRunner.query(`
            DROP TABLE "favorite"
        `);
  }
}
