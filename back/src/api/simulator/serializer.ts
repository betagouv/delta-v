import currency from 'currency.js';
import { ProductTaxesInterface } from '../../entities/productTaxes.entity';

interface ProductSerializer {
  id: string;
  name: string;
  amount: number;
  customDuty: number;
  vat: number;
  unitPrice: number;
  totalPrice: number;
  unitCustomDuty: number;
  unitVat: number;
  unitTaxes: number;
  totalCustomDuty: number;
  totalVat: number;
  totalTaxes: number;
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
  franchiseAmount: number;
}

const serializeProduct = (productTaxes: ProductTaxesInterface): ProductSerializer => ({
  id: productTaxes.id,
  name: productTaxes.name,
  amount: productTaxes.amount,
  unitPrice: productTaxes.unitPrice,
  customDuty: productTaxes.customDuty,
  vat: productTaxes.vat,
  totalPrice: productTaxes.getTotalPrice(),
  unitCustomDuty: productTaxes.getUnitCustomDuty(),
  unitVat: productTaxes.getUnitVat(),
  unitTaxes: productTaxes.getUnitTaxes(),
  totalCustomDuty: productTaxes.getTotalCustomDuty(),
  totalVat: productTaxes.getTotalVat(),
  totalTaxes: productTaxes.getTotalTaxes(),
});

export const serializeSimulator = ({
  products,
  franchiseAmount,
}: SerializedSimulatorOptions): SerializedSimulatorResponse => {
  const totalCustomDuty = products.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getTotalCustomDuty()).value,
    0,
  );
  const totalVat = products.reduce(
    (acc, productTaxes) => currency(acc).add(productTaxes.getTotalVat()).value,
    0,
  );
  return {
    products: products.map(serializeProduct),
    total: products.reduce(
      (total, productTaxes) => currency(total).add(productTaxes.getTotalPrice()).value,
      0,
    ),
    totalCustomDuty,
    totalVat,
    totalTaxes: currency(totalCustomDuty).add(totalVat).value,
    franchiseAmount,
  };
};
