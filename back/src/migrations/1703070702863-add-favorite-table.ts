import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFavoriteTable1703070702863 implements MigrationInterface {
  name = 'AddFavoriteTable1703070702863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "favorite" (
                "userId" uuid NOT NULL,
                "productId" uuid NOT NULL,
                CONSTRAINT "PK_f0e7bf803aa937033d10dc07ed4" PRIMARY KEY ("userId", "productId")
            )
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
            DROP TABLE "favorite"
        `);
  }
}
