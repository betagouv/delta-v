import { AppDataSource, initDatabase } from '../../loader/database';
import { syncCurrency } from './script';

export const runScript = async (): Promise<void> => {
  try {
    await initDatabase();
    await syncCurrency();
    await AppDataSource.destroy();
  } catch (error) {
    process.exit(1);
  }
};

void runScript();
