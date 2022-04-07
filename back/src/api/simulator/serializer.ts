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
    (acc, productTaxes) => acc + productTaxes.getTotalCustomDuty(),
    0,
  );
  const totalVat = products.reduce((acc, productTaxes) => acc + productTaxes.getTotalVat(), 0);
  return {
    products: products.map(serializeProduct),
    total: products.reduce((total, productTaxes) => total + productTaxes.getTotalPrice(), 0),
    totalCustomDuty,
    totalVat,
    totalTaxes: totalCustomDuty + totalVat,
    franchiseAmount,
  };
};
