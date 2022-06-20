import currency from 'currency.js';
import { ProductTaxesInterface } from '../../entities/productTaxes.entity';

interface ProductSerializer {
  id: string;
  name: string;
  customName?: string;
  customDuty: number;
  vat: number;
  unitPrice: number;
  unitCustomDuty: number;
  unitVat: number;
  unitTaxes: number;
}

interface SerializedSimulatorOptions {
  products: ProductTaxesInterface[];
  franchiseAmount: number;
}

interface SerializedSimulatorResponse {
  products?: ProductSerializer[];
  total: number;
  totalCustomDuty: number;
  totalVat: number;
  totalTaxes: number;
  franchiseAmount: number | string;
}

const serializeProduct = (productTaxes: ProductTaxesInterface): ProductSerializer => ({
  id: productTaxes.id,
  name: productTaxes.name,
  customName: productTaxes.customName,
  unitPrice: productTaxes.unitPrice,
  customDuty: productTaxes.customDuty,
  vat: productTaxes.vat,
  unitCustomDuty: productTaxes.getUnitCustomDuty(),
  unitVat: productTaxes.getUnitVat(),
  unitTaxes: productTaxes.getUnitTaxes(),
});

export const serializeSimulator = ({
  products,
  franchiseAmount,
}: SerializedSimulatorOptions): SerializedSimulatorResponse => {
  const totalCustomDuty = products.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getUnitCustomDuty()).value,
    0,
  );
  const totalVat = products.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getUnitVat()).value,
    0,
  );
  return {
    products: products.map(serializeProduct),
    total: products.reduce(
      (total, productTaxes) => currency(total).add(productTaxes.unitPrice).value,
      0,
    ),
    totalCustomDuty,
    totalVat,
    totalTaxes: currency(totalCustomDuty).add(totalVat).value,
    franchiseAmount: franchiseAmount === Infinity ? '∞' : franchiseAmount,
  };
};
