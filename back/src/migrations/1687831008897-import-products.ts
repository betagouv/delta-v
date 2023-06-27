import { resolve } from 'path';
import fs from 'fs';
import { MigrationInterface, QueryRunner } from 'typeorm';

function queriesFromFile(file: 'up' | 'down'): string {
  return fs.readFileSync(resolve(__dirname, `queries/addProducts/${file}.sql`)).toString();
}

export class ImportProducts1687831008897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const query = queriesFromFile('up');
      await queryRunner.query(query);
    } catch (typeOrmError) {
      throw Object.assign(new Error(), { typeOrmError });
    }
  }

  public down(): Promise<void> {
    throw new Error('Init migration cannot be reverted');
  }
}
