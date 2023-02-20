import { initDatabase } from '../../loader/database';
import { syncCurrency } from './script';

export const runScript = async (): Promise<void> => {
  try {
    const connection = await initDatabase();
    await syncCurrency();
    await connection.close();
  } catch (error) {
    process.exit(1);
  }
};

void runScript();
