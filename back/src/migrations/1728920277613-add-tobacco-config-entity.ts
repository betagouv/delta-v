import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTobaccoConfigEntity1728920277613 implements MigrationInterface {
  name = 'AddTobaccoConfigEntity1728920277613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "tobacco_config" (
                "id" uuid NOT NULL,
                "productId" uuid NOT NULL,
                "referencePrice" real NOT NULL,
                "taxCategoryRate" real NOT NULL,
                "taxCategoryPrice" real NOT NULL,
                CONSTRAINT "REL_844a9426546c244bd589148f69" UNIQUE ("productId"),
                CONSTRAINT "PK_34539849c26758535d01f80857c" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "tobacco_config"
            ADD CONSTRAINT "FK_844a9426546c244bd589148f691" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "tobacco_config" DROP CONSTRAINT "FK_844a9426546c244bd589148f691"
        `);
    await queryRunner.query(`
            DROP TABLE "tobacco_config"
        `);
  }
}
