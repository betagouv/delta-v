import { separateFreeAndPaidProducts } from '../../../../src/api/simulator/services/freeProduct.service';
import { productTaxesEntityFactory } from '../../../helpers/factories/productTaxes.factory';

describe('separateFreeAndPaidProducts', () => {
  it('should get only free products - total under franchise', () => {
    const productsTaxes = [
      productTaxesEntityFactory({
        vat: 20,
        customDuty: 5,
        unitPrice: 50,
      }),
      productTaxesEntityFactory({
        vat: 20,
        customDuty: 5,
        unitPrice: 50,
      }),
    ];
    const { freeProducts, paidProducts } = separateFreeAndPaidProducts({
      franchiseAmount: 201,
      productsTaxes,
    });

    expect(freeProducts.length).toEqual(2);
    expect(paidProducts.length).toEqual(0);
  });
  it('should get only paid products - all products over franchise', () => {
    const productsTaxes = [
      productTaxesEntityFactory({ unitPrice: 50, vat: 20, customDuty: 20 }),
      productTaxesEntityFactory({ unitPrice: 50, vat: 20, customDuty: 20 }),
    ];
    const { freeProducts, paidProducts } = separateFreeAndPaidProducts({
      franchiseAmount: 49,
      productsTaxes,
    });
    expect(freeProducts.length).toEqual(0);
    expect(paidProducts.length).toEqual(2);
    expect(paidProducts).toMatchObject([
      { unitPrice: 50, vat: 20, customDuty: 20 },
      { unitPrice: 50, vat: 20, customDuty: 20 },
    ]);
  });
  it('should get paid and free products - products over and under franchise', () => {
    const productsTaxes = [
      productTaxesEntityFactory({ unitPrice: 101, vat: 20, customDuty: 20 }),
      productTaxesEntityFactory({ unitPrice: 99, vat: 20, customDuty: 20 }),
    ];
    const { freeProducts, paidProducts } = separateFreeAndPaidProducts({
      franchiseAmount: 100,
      productsTaxes,
    });
    expect(freeProducts.length).toEqual(1);
    expect(paidProducts.length).toEqual(1);
    expect(paidProducts).toMatchObject([{ unitPrice: 101, vat: 20, customDuty: 20 }]);
    expect(freeProducts).toMatchObject([{ unitPrice: 99, vat: 0, customDuty: 0 }]);
  });
  it('should get paid and free products - products over and under franchise', () => {
    const productsTaxes = [
      productTaxesEntityFactory({ unitPrice: 101 }),
      productTaxesEntityFactory({ unitPrice: 51 }),
      productTaxesEntityFactory({ unitPrice: 51 }),
    ];
    const { freeProducts, paidProducts } = separateFreeAndPaidProducts({
      franchiseAmount: 100,
      productsTaxes,
    });

    expect(freeProducts.length).toEqual(1);
    expect(paidProducts.length).toEqual(2);
    expect(paidProducts).toMatchObject([{ unitPrice: 51 }, { unitPrice: 101 }]);
    expect(freeProducts).toMatchObject([{ unitPrice: 51, vat: 0, customDuty: 0 }]);
  });
  it('should get paid and free products - mixed simple result', () => {
    const productsTaxes = [
      productTaxesEntityFactory({ id: '1', unitPrice: 100, vat: 20, customDuty: 20 }),
      productTaxesEntityFactory({ id: '2', unitPrice: 100, vat: 20, customDuty: 15 }),
      productTaxesEntityFactory({ id: '3', unitPrice: 100, vat: 20, customDuty: 12 }),
      productTaxesEntityFactory({ id: '4', unitPrice: 100, vat: 20, customDuty: 10 }),
      productTaxesEntityFactory({ id: '5', unitPrice: 100, vat: 20, customDuty: 5 }),
      productTaxesEntityFactory({ id: '6', unitPrice: 100, vat: 20, customDuty: 0 }),
    ];
    const { freeProducts, paidProducts } = separateFreeAndPaidProducts({
      franchiseAmount: 430,
      productsTaxes,
    });

    expect(paidProducts.length).toEqual(2);
    expect(freeProducts.length).toEqual(4);
    expect(paidProducts).toMatchObject([
      { id: '6', unitPrice: 100, vat: 20, customDuty: 0 },
      { id: '5', unitPrice: 100, vat: 20, customDuty: 5 },
    ]);
    expect(freeProducts).toMatchObject([
      { id: '4', unitPrice: 100, vat: 0, customDuty: 0 },
      { id: '3', unitPrice: 100, vat: 0, customDuty: 0 },
      { id: '2', unitPrice: 100, vat: 0, customDuty: 0 },
      { id: '1', unitPrice: 100, vat: 0, customDuty: 0 },
    ]);
  });
  it('should get paid and free products - with more complex composition', () => {
    const productsTaxes = [
      productTaxesEntityFactory({ id: '1', unitPrice: 100, vat: 20, customDuty: 18 }),
      productTaxesEntityFactory({ id: '2', unitPrice: 100, vat: 20, customDuty: 3 }),
      productTaxesEntityFactory({ id: '1', unitPrice: 51, vat: 20, customDuty: 18 }),
      productTaxesEntityFactory({ id: '1', unitPrice: 45, vat: 20, customDuty: 18 }),
      productTaxesEntityFactory({ id: '1', unitPrice: 85, vat: 20, customDuty: 18 }),
      productTaxesEntityFactory({ id: '3', unitPrice: 30, vat: 20, customDuty: 20 }),
      productTaxesEntityFactory({ id: '4', unitPrice: 30, vat: 2, customDuty: 2 }),
      productTaxesEntityFactory({ id: '3', unitPrice: 16, vat: 20, customDuty: 20 }),
      productTaxesEntityFactory({ id: '5', unitPrice: 200, vat: 10, customDuty: 0 }),
    ];
    const { freeProducts, paidProducts } = separateFreeAndPaidProducts({
      franchiseAmount: 430,
      productsTaxes,
    });

    expect(paidProducts.length).toEqual(2);
    expect(freeProducts.length).toEqual(7);
    expect(paidProducts).toMatchObject([
      { id: '5', unitPrice: 200, vat: 10, customDuty: 0 },
      { id: '4', unitPrice: 30, vat: 2, customDuty: 2 },
    ]);
    expect(freeProducts).toMatchObject([
      { id: '3', unitPrice: 16, vat: 0, customDuty: 0 },
      { id: '3', unitPrice: 30, vat: 0, customDuty: 0 },
      { id: '1', unitPrice: 85, vat: 0, customDuty: 0 },
      { id: '1', unitPrice: 45, vat: 0, customDuty: 0 },
      { id: '1', unitPrice: 51, vat: 0, customDuty: 0 },
      { id: '2', unitPrice: 100, vat: 0, customDuty: 0 },
      { id: '1', unitPrice: 100, vat: 0, customDuty: 0 },
    ]);
  });
});
