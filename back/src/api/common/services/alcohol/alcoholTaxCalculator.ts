import { DetailedShoppingProduct } from '../detailedShoppingProduct';
import { getRoundedNumber } from '../../../../utils/roundedNumber';
import { AlcoholExceed } from '../amountProducts/alcohol/alcoholExceed.service';
import { TravelerData } from '../traveler';

export interface AlcoholTaxDetail {
  type: string;
  amount: number; // Quantité en litres
  tax: number;
  price?: number; // Prix dans la devise d'origine à l'unité
  priceInEuros?: number; // Prix converti en euros à l'unité
  customId?: string; // ID unique du produit
  details: {
    excise: number;
    css: number;
    customsDuty: number; // Droits de douane
    vat: number; // TVA
  };
}

interface TaxRates {
  exciseRate?: number;
  cssRate: number;
  minimumThreshold: number;
  customDutyRate: number;
  vatRate: number;
}

export class AlcoholTaxCalculator {
  private static readonly BASE_EXCISE_RATE = 18.6652; // Taux de base par litre d'alcool pur

  private static readonly TAX_RATES: Record<string, TaxRates> = {
    alcoholStrong: {
      // Alcool fort (>22°)
      exciseRate: 18.6652, // Taux de base par litre d'alcool pur
      cssRate: 1.32, // Cotisation sécurité sociale fixe par litre
      minimumThreshold: 0,
      customDutyRate: 0, // 0% droits de douane
      vatRate: 0.2, // 20% TVA
    },
    alcoholWeak: {
      // Alcool faible (<22°)
      exciseRate: 18.6652, // Taux de base par litre d'alcool pur
      cssRate: 0, // Pas de cotisation sécurité sociale
      minimumThreshold: 0,
      customDutyRate: 0, // 0% droits de douane
      vatRate: 0.2, // 20% TVA
    },
    beer: {
      exciseRate: 0.0796, // Taux par degré d'alcool
      cssRate: 0, // Pas de cotisation sécurité sociale
      minimumThreshold: 1, // Si arrondi < 1€, alors droits d'accises = 0€
      customDutyRate: 0, // 0% droits de douane
      vatRate: 0.2, // 20% TVA
    },
    wine: {
      exciseRate: 0.0405, // Tarif fixe par litre
      cssRate: 0, // Pas de cotisation sécurité sociale
      minimumThreshold: 1, // Si arrondi < 1€, alors droits d'accises = 0€
      customDutyRate: 0, // 0% droits de douane
      vatRate: 0.2, // 20% TVA
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

    return excessProducts.map((product) => {
      const type = product.product?.amountProduct || '';
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
            customsDuty: 0,
            vat: 0,
          },
        };
      }

      const alcoholDegree = product.product?.alcoholDegree || 0;
      console.log('alcoholDegree', alcoholDegree);
      const liters = product.taxableValue || 0;
      console.log('liters', liters);
      const price = product.price || 0;
      const priceInEuros = product.priceInEuros || 0;

      // Calcul des accises selon le type d'alcool
      let exciseNetRate = 0;
      if (mappedType === 'beer' && rates.exciseRate) {
        // Pour la bière : taux par degré
        exciseNetRate = rates.exciseRate * (alcoholDegree / 100);
      } else if (mappedType === 'wine' && rates.exciseRate) {
        // Pour le vin : taux fixe
        exciseNetRate = rates.exciseRate;
      } else {
        // Pour les autres alcools : calcul basé sur le degré d'alcool réel
        exciseNetRate = this.BASE_EXCISE_RATE * (alcoholDegree / 100);
        console.log('exciseNetRate', exciseNetRate);
      }

      const exciseTotal = exciseNetRate * liters;
      const cssTotal = rates.cssRate * liters;

      // Application des règles d'arrondi
      const roundedExcise = Math.round(exciseTotal);
      const finalExcise =
        ['beer', 'wine'].includes(mappedType) && roundedExcise < rates.minimumThreshold
          ? 0
          : roundedExcise;

      const roundedCss = Math.round(cssTotal);

      // Calcul des droits de douane (20% du prix)
      const customsDuty = Math.round(priceInEuros * rates.customDutyRate * 100) / 100;

      // Calcul de la TVA (20% sur prix + accise + droits de douane)
      const vatBase = priceInEuros + finalExcise + customsDuty;
      const vat = Math.round(vatBase * rates.vatRate * 100) / 100;

      // Total des taxes
      const totalTax = finalExcise + customsDuty + vat + roundedCss;

      return {
        type: this.getReadableTypeName(type),
        amount: liters,
        tax: Math.round(totalTax * 100) / 100,
        price,
        priceInEuros,
        customId: product.shoppingProduct.customId,
        details: {
          excise: finalExcise,
          css: roundedCss,
          customsDuty,
          vat,
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
}
