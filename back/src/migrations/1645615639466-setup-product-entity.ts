import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupProductEntity1645615639466 implements MigrationInterface {
  name = 'SetupProductEntity1645615639466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL, "parentProductId" uuid, "name" character varying NOT NULL, "info" text, "childrenQuestion" text, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_154266cbc255b76b377d9892517" PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e873aa1e6bddd990dd67b12864" ON "product_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eecc2118235f8fc29338bcac5b" ON "product_closure" ("id_descendant") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_f35c7895da79895c0dd27196d6b" FOREIGN KEY ("parentProductId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_closure" ADD CONSTRAINT "FK_e873aa1e6bddd990dd67b128646" FOREIGN KEY ("id_ancestor") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_closure" ADD CONSTRAINT "FK_eecc2118235f8fc29338bcac5bb" FOREIGN KEY ("id_descendant") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_closure" DROP CONSTRAINT "FK_eecc2118235f8fc29338bcac5bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_closure" DROP CONSTRAINT "FK_e873aa1e6bddd990dd67b128646"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_f35c7895da79895c0dd27196d6b"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_eecc2118235f8fc29338bcac5b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e873aa1e6bddd990dd67b12864"`);
    await queryRunner.query(`DROP TABLE "product_closure"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
