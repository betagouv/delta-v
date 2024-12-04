import { DetailedShoppingProduct } from '../detailedShoppingProduct';
import { AmountTobaccoProduct } from '../amountProducts/tobacco/tobacco.service';
import { getRoundedNumber } from '../../../../utils/roundedNumber';

export interface TobaccoTaxDetail {
  type: string;
  amount: number;
  tax: number;
  details: {
    excise1: number;
    excise2: number;
    threshold: number;
  };
}

export class TobaccoTaxCalculator {
  private static readonly TAX_RATES = {
    tobaccoCigarettes: {
      unitPrice: 0.6,
      exciseRate: 0.55,
      exciseDuty: 0.0713,
      perceptionThreshold: 0.3714,
    },
    tobaccoCigars: {
      unitPrice: 0.7,
      exciseRate: 0.363,
      exciseDuty: 0.0547,
      perceptionThreshold: 0.2966,
    },
    tobaccoCigarillos: {
      unitPrice: 0.7,
      exciseRate: 0.363,
      exciseDuty: 0.0547,
      perceptionThreshold: 0.2966,
    },
    tobaccoOther: {
      unitPrice: 0.6,
      exciseRate: 0.491,
      exciseDuty: 0.0997,
      perceptionThreshold: 0.3454,
    },
  };

  private static readonly TYPE_MAPPING = {
    cigarette: 'tobaccoCigarettes',
    cigar: 'tobaccoCigars',
    cigarillos: 'tobaccoCigarillos',
    tobacco: 'tobaccoOther',
  } as const;

  private static mapType(type: string): string {
    return this.TYPE_MAPPING[type as keyof typeof this.TYPE_MAPPING] || type;
  }

  public static calculateTax(detailedShoppingProducts: DetailedShoppingProduct[]): number {
    const details = this.calculateDetailedTaxes(detailedShoppingProducts);
    return details.reduce((total, detail) => total + detail.tax, 0);
  }

  public static calculateRoundedTax(detailedShoppingProducts: DetailedShoppingProduct[]): number {
    const details = this.calculateDetailedTaxes(detailedShoppingProducts);
    return details.reduce((total, detail) => total + getRoundedNumber(detail.tax), 0);
  }

  public static calculateDetailedTaxes(
    detailedShoppingProducts: DetailedShoppingProduct[],
  ): TobaccoTaxDetail[] {
    const tobaccoProducts = this.filterTobaccoProducts(detailedShoppingProducts);

    const groupedByType = this.groupByType(tobaccoProducts);

    return Object.entries(groupedByType).map(([type, products]) => {
      const mappedType = this.mapType(type);
      const rates = this.TAX_RATES[mappedType as keyof typeof this.TAX_RATES];

      if (!rates) {
        console.warn(`Unknown tobacco type: ${type} (mapped to ${mappedType})`);
        return {
          type: this.getReadableTypeName(type),
          amount: 0,
          tax: 0,
          details: {
            excise1: 0,
            excise2: 0,
            threshold: 0,
          },
        };
      }

      const amount = products.reduce((sum, p) => sum + p.getDefaultCurrencyValue(), 0);
      const excise1 = rates.unitPrice * amount * rates.exciseRate;
      const excise2 = rates.exciseDuty * amount;
      const threshold = rates.perceptionThreshold * amount;

      const totalTax = excise1 + excise2;
      const finalTax = totalTax <= threshold ? threshold : totalTax;

      return {
        type: this.getReadableTypeName(type),
        amount,
        tax: Math.round(finalTax * 100) / 100,
        details: {
          excise1,
          excise2,
          threshold,
        },
      };
    });
  }

  private static groupByType(
    products: DetailedShoppingProduct[],
  ): Record<string, DetailedShoppingProduct[]> {
    return products.reduce((acc, product) => {
      const type = product.product?.amountProduct || '';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(product);
      return acc;
    }, {} as Record<string, DetailedShoppingProduct[]>);
  }

  private static filterTobaccoProducts(
    products: DetailedShoppingProduct[],
  ): DetailedShoppingProduct[] {
    return products.filter((product) =>
      Object.values(AmountTobaccoProduct).includes(
        product.product?.amountProduct as AmountTobaccoProduct,
      ),
    );
  }

  private static getReadableTypeName(type: string): string {
    const names: Record<string, string> = {
      tobaccoCigarettes: 'Cigarettes',
      tobaccoCigarillos: 'Cigarillos',
      tobaccoCigars: 'Cigares',
      tobaccoOther: 'Tabac à fumer',
    };
    return names[type] || type;
  }
}
