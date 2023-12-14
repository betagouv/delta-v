import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSearchProductHistory1702473254153 implements MigrationInterface {
  name = 'AddSearchProductHistory1702473254153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "search_product_history" (
                "productId" uuid NOT NULL,
                "userId" uuid NOT NULL,
                "searchDate" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a009baec55604699983a449f003" PRIMARY KEY ("productId", "userId")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "search_product_history"
            ADD CONSTRAINT "FK_a999a16b3d2af5e337edf3cc2e1" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "search_product_history"
            ADD CONSTRAINT "FK_77083da0fd2f717f690346068bc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "search_product_history" DROP CONSTRAINT "FK_77083da0fd2f717f690346068bc"
        `);
    await queryRunner.query(`
            ALTER TABLE "search_product_history" DROP CONSTRAINT "FK_a999a16b3d2af5e337edf3cc2e1"
        `);
    await queryRunner.query(`
            DROP TABLE "search_product_history"
        `);
  }
}
