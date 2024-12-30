import { DetailedShoppingProduct } from '../detailedShoppingProduct';
import { getRoundedNumber } from '../../../../utils/roundedNumber';
import { AlcoholExceed } from '../amountProducts/alcohol/alcoholExceed.service';
import { TravelerData } from '../traveler';

export interface AlcoholTaxDetail {
  type: string;
  amount: number;
  tax: number;
  details: {
    excise: number;
    css: number;
  };
}

export class AlcoholTaxCalculator {
  private static readonly TAX_RATES = {
    alcoholStrong: {
      // Alcool +22°
      exciseRate: 4.11, // 18.6652 * 0.22
      cssRate: 1.32,
      minimumThreshold: 0,
    },
    alcoholWeak: {
      // Alcool -22°
      exciseRate: 2.8, // 18.6652 * 0.15
      cssRate: 0,
      minimumThreshold: 0,
    },
    beer: {
      exciseRate: 0.6368, // 0.0796 * 8
      cssRate: 0,
      minimumThreshold: 1,
    },
    wine: {
      exciseRate: 0.0405,
      cssRate: 0,
      minimumThreshold: 1,
    },
  };

  private static readonly TYPE_MAPPING = {
    strongAlcohol: 'alcoholStrong',
    softAlcohol: 'alcoholWeak',
    beer: 'beer',
    wine: 'wine',
    sparklingWine: 'wine',
    spiritDrink: 'alcoholStrong',
    alcoholIntermediate: 'alcoholWeak',
  } as const;

  private static mapType(type: string): string {
    return this.TYPE_MAPPING[type as keyof typeof this.TYPE_MAPPING] || type;
  }

  public static calculateTax(
    detailedShoppingProducts: DetailedShoppingProduct[],
    travelerData: TravelerData,
  ): number {
    const details = this.calculateDetailedTaxes(detailedShoppingProducts, travelerData);
    return details.reduce((total, detail) => total + detail.tax, 0);
  }

  public static calculateRoundedTax(
    detailedShoppingProducts: DetailedShoppingProduct[],
    travelerData: TravelerData,
  ): number {
    const details = this.calculateDetailedTaxes(detailedShoppingProducts, travelerData);
    return details.reduce((total, detail) => total + getRoundedNumber(detail.tax), 0);
  }

  public static calculateDetailedTaxes(
    detailedShoppingProducts: DetailedShoppingProduct[],
    travelerData: TravelerData,
  ): AlcoholTaxDetail[] {
    const alcoholExceed = new AlcoholExceed({
      travelerData: travelerData,
      detailedShoppingProducts: detailedShoppingProducts,
    });
    const alcoholProducts = alcoholExceed.getExcessProducts();
    const groupedByType = this.groupByType(alcoholProducts);

    return Object.entries(groupedByType).map(([type, products]) => {
      const mappedType = this.mapType(type);
      const rates = this.TAX_RATES[mappedType as keyof typeof this.TAX_RATES];

      if (!rates) {
        console.warn(`Unknown alcohol type: ${type} (mapped to ${mappedType})`);
        return {
          type: this.getReadableTypeName(type),
          amount: 0,
          tax: 0,
          details: {
            excise: 0,
            css: 0,
          },
        };
      }

      const liters = products.reduce((sum, p) => sum + (p.taxableValue ?? 0), 0);
      let excise = rates.exciseRate * liters;
      const css = rates.cssRate * liters;

      // Pour la bière et le vin, si l'accise arrondie est < 1€, on met à 0
      if (['beer', 'wine'].includes(mappedType)) {
        excise = Math.round(excise) < rates.minimumThreshold ? 0 : Math.round(excise);
      } else {
        excise = Math.round(excise);
      }

      const totalTax = excise + css;

      return {
        type: this.getReadableTypeName(type),
        amount: liters,
        tax: Math.round(totalTax * 100) / 100,
        details: {
          excise,
          css,
        },
      };
    });
  }

  private static getReadableTypeName(type: string): string {
    const names: Record<string, string> = {
      spiritDrink: 'Boissons spiritueuses (whisky, gin, vodka, etc.)',
      alcoholIntermediate: 'Produits intermédiaires (vermouth, porto, madère, etc.)',
      alcoholStrong: 'Alcool fort (+22°)',
      alcoholWeak: 'Alcool faible (-22°)',
      beer: 'Bière',
      wine: 'Vin tranquille',
      sparklingWine: 'Vin mousseux',
    };
    return names[type] || type;
  }

  // Les autres méthodes utilitaires restent similaires au TobaccoTaxCalculator
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
}
