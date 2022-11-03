import { Currency } from '../../../entities/currency.entity';
import { CurrencyRepositoryInterface } from '../../../repositories/currency.repository';

interface GetAllCurrenciesService {
  currencyRepository: CurrencyRepositoryInterface;
}

export const service = async ({
  currencyRepository,
}: GetAllCurrenciesService): Promise<Currency[]> => currencyRepository.getAll();
