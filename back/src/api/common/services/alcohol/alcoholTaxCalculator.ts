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

interface TaxRates {
  exciseRate?: number;
  cssRate: number;
  minimumThreshold: number;
}

export class AlcoholTaxCalculator {
  private static readonly BASE_EXCISE_RATE = 18.6652; // Taux de base par litre d'alcool pur

  private static readonly TAX_RATES: Record<string, TaxRates> = {
    alcoholStrong: {
      // Alcool fort (>22°)
      cssRate: 1.32, // Cotisation sécurité sociale fixe par litre
      minimumThreshold: 0,
    },
    alcoholWeak: {
      // Alcool faible (<22°)
      cssRate: 0, // Pas de cotisation sécurité sociale
      minimumThreshold: 0,
    },
    beer: {
      exciseRate: 0.0796, // Taux par degré d'alcool
      cssRate: 0, // Pas de cotisation sécurité sociale
      minimumThreshold: 1, // Si arrondi < 1€, alors droits d'accises = 0€
    },
    wine: {
      exciseRate: 0.0405, // Tarif fixe par litre
      cssRate: 0, // Pas de cotisation sécurité sociale
      minimumThreshold: 1, // Si arrondi < 1€, alors droits d'accises = 0€
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
      travelerData,
      detailedShoppingProducts,
    });
    const excessProducts = alcoholExceed.getExcessProducts();
    const groupedByType = this.groupByType(excessProducts);

    return Object.entries(groupedByType).map(([type, products]) => {
      const mappedType = this.mapType(type);
      const rates = this.TAX_RATES[mappedType];

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
      let excise = 0;

      // Calcul des accises selon le type d'alcool
      if (mappedType === 'beer' && rates.exciseRate) {
        // Pour la bière : taux par degré
        const averageDegree = this.getAverageAlcoholDegree(products) || 8; // 8° par défaut si non spécifié
        excise = rates.exciseRate * averageDegree * liters;
      } else if (mappedType === 'wine' && rates.exciseRate) {
        // Pour le vin : taux fixe
        excise = rates.exciseRate * liters;
      } else {
        // Pour les autres alcools : calcul basé sur le degré d'alcool réel
        const averageDegree = this.getAverageAlcoholDegree(products);
        excise = this.BASE_EXCISE_RATE * (averageDegree / 100) * liters;
      }

      const css = rates.cssRate * liters;

      // Application des règles d'arrondi
      excise = Math.round(excise);
      if (['beer', 'wine'].includes(mappedType) && excise < rates.minimumThreshold) {
        excise = 0;
      }

      const roundedCss = Math.round(css);
      const totalTax = excise + roundedCss;

      return {
        type: this.getReadableTypeName(type),
        amount: liters,
        tax: Math.round(totalTax * 100) / 100, // Arrondi à 2 décimales
        details: {
          excise,
          css: roundedCss,
        },
      };
    });
  }

  private static getAverageAlcoholDegree(products: DetailedShoppingProduct[]): number {
    const productsWithDegree = products.filter((p) => p.product?.alcoholDegree);
    if (productsWithDegree.length === 0) return 0;

    const totalDegree = productsWithDegree.reduce(
      (sum, p) => sum + (p.product?.alcoholDegree || 0),
      0,
    );
    return totalDegree / productsWithDegree.length;
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
