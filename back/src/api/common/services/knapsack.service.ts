import { SimpleProduct } from './valueProducts';

interface KnapsackOptions {
  maximumWeight: number;
  items: SimpleProduct[];
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const hasOwnProperty = Object.prototype.hasOwnProperty;
const knapsack = ({ maximumWeight, items }: KnapsackOptions): SimpleProduct[] => {
  const maxItemIndex = items.length - 1;
  const totalCapacity = maximumWeight;
  const memo: number[] = [];
  return select();

  function value(itemIndex: number, capacity: number): number {
    if (itemIndex < 0 || capacity <= 0) return 0;
    const key = totalCapacity * itemIndex + (capacity - 1);
    if (hasOwnProperty.call(memo, key)) return memo[key];
    return (memo[key] = calculateValue(itemIndex, capacity));
  }

  function calculateValue(itemIndex: number, capacity: number): number {
    const { price: itemCost, taxes: itemValue } = items[itemIndex];
    const vPrevious = value(itemIndex - 1, capacity);
    if (itemCost > capacity) return vPrevious;
    const vCombined = value(itemIndex - 1, capacity - itemCost) + itemValue;
    return vCombined > vPrevious ? vCombined : vPrevious;
  }

  function select(): SimpleProduct[] {
    const bag: SimpleProduct[] = [];
    for (let i = maxItemIndex, capacity = totalCapacity; i >= 0; i -= 1) {
      if (value(i, capacity) <= value(i - 1, capacity)) continue;
      const item = items[i];
      capacity -= item.price;
      bag.push(item);
    }
    return bag;
  }
};

interface GetBestFitProductsResponse {
  fitProducts: SimpleProduct[];
  notFitProducts: SimpleProduct[];
}

export const getBestFitProducts = (
  simpleProducts: SimpleProduct[],
  franchiseAmount: number,
): GetBestFitProductsResponse => {
  const fitProducts = knapsack({
    maximumWeight: franchiseAmount,
    items: simpleProducts,
  });
  const notFitProducts = simpleProducts.filter(
    (simpleProduct) => !fitProducts.includes(simpleProduct),
  );
  return { fitProducts, notFitProducts };
};
