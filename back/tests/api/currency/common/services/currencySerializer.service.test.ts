import {
  RawCurrency,
  serializeCurrency,
} from '../../../../../src/api/currency/common/services/currencySerializer.service';

describe('serializeCurrency', () => {
  it('should serialize currency raw to currency entity', () => {
    const rawCurrency: RawCurrency = {
      country: 'Royaume-Uni',
      currency: 'Livre sterling',
      isoA3Code: 'GBP',
      isoA2Code: 'GB',
      value: 0.89485,
      comment:
        'Livre sterling: Egalement valable pour Géorgie du Sud et Sandwich du Sud, îles (GS).',
    };

    const currency = serializeCurrency(rawCurrency);
    expect(currency).toMatchObject({
      id: 'GBP',
      name: 'Livre sterling',
      value: 0.89485,
      comment:
        'Livre sterling: Egalement valable pour Géorgie du Sud et Sandwich du Sud, îles (GS).',
    });
    expect(currency.updateDate).toBeInstanceOf(Date);
  });
});
