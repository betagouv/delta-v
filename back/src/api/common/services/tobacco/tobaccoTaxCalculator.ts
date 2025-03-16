import { DetailedShoppingProduct } from '../detailedShoppingProduct';
import { getRoundedNumber } from '../../../../utils/roundedNumber';
import { TravelerData } from '../traveler';
import { TobaccoExceed } from '../amountProducts/tobacco/tobaccoExceed.service';

export interface TobaccoTaxDetail {
  type: string;
  amount: number; // Quantité en litres
  tax: number;
  price?: number; // Prix dans la devise d'origine à l'unité
  priceInEuros?: number; // Prix converti en euros à l'unité
  customId?: string; // ID unique du produit
  details: {
    excise1: number;
    excise2: number;
    threshold: number;
    customsDuty: number;
    vat: number;
  };
}

export class TobaccoTaxCalculator {
  private static readonly TAX_RATES = {
    tobaccoCigarettes: {
      unitPrice: 0.6,
      exciseRate: 0.55,
      exciseDuty: 0.0713,
      perceptionThreshold: 0.3714,
      customDutyRate: 0.576, // 57.6% droits de douane
      vatRate: 0.2, // 20% TVA
    },
    tobaccoCigars: {
      unitPrice: 0.7,
      exciseRate: 0.363,
      exciseDuty: 0.0547,
      perceptionThreshold: 0.2966,
      customDutyRate: 0.26, // 26% droits de douane
      vatRate: 0.2, // 20% TVA
    },
    tobaccoCigarillos: {
      unitPrice: 0.7,
      exciseRate: 0.363,
      exciseDuty: 0.0547,
      perceptionThreshold: 0.2966,
      customDutyRate: 0.26, // 26% droits de douane
      vatRate: 0.2, // 20% TVA
    },
    tobaccoOther: {
      unitPrice: 0.6,
      exciseRate: 0.491,
      exciseDuty: 0.0997,
      perceptionThreshold: 0.3454,
      customDutyRate: 0.749, // 74.9% droits de douane
      vatRate: 0.2, // 20% TVA
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
  ): TobaccoTaxDetail[] {
    const tobaccoGroup = new TobaccoExceed({ detailedShoppingProducts, travelerData });
    const excessProducts = tobaccoGroup.getExcessProducts();

    return excessProducts.map((product) => {
      const type = product.product?.amountProduct || '';
      const mappedType = this.mapType(type);
      const rates = this.TAX_RATES[mappedType as keyof typeof this.TAX_RATES];

      if (!rates) {
        console.warn(`Unknown tobacco type: ${type} (mapped to ${mappedType})`);
        return {
          type: this.getReadableTypeName(type),
          amount: 0,
          tax: 0,
          customId: product.shoppingProduct.customId,
          details: {
            excise1: 0,
            excise2: 0,
            threshold: 0,
            customsDuty: 0,
            vat: 0,
          },
        };
      }

      const amount = product.taxableValue || 0;
      const price = product.price || 0;
      const priceInEuros = product.priceInEuros || 0;

      // Calcul accise 1 : (prix unitaire * quantité) * taux accises
      const excise1 = rates.unitPrice * amount * rates.exciseRate;

      // Calcul accise 2 : tarif accises * quantité
      const excise2 = rates.exciseDuty * amount;

      // Calcul du seuil de perception
      const threshold = rates.perceptionThreshold * amount;

      // Calcul du total des accises (sans arrondi)
      const totalExcise = excise1 + excise2;

      // Application du seuil de perception
      const finalExcise =
        totalExcise <= threshold ? Math.round(threshold) : Math.round(totalExcise);

      // Calcul des droits de douane
      const customsDuty = Math.round(priceInEuros * rates.customDutyRate * 100) / 100;

      // Calcul de la TVA (20% sur prix + accise + droits de douane)
      const vatBase = priceInEuros + finalExcise + customsDuty;
      const vat = Math.round(vatBase * rates.vatRate * 100) / 100;

      // Total des taxes
      const totalTax = finalExcise + customsDuty + vat;

      return {
        type: this.getReadableTypeName(type),
        amount,
        tax: Math.round(totalTax * 100) / 100,
        price,
        priceInEuros,
        customId: product.shoppingProduct.customId,
        details: {
          excise1,
          excise2,
          threshold,
          customsDuty,
          vat,
        },
      };
    });
  }

  private static getReadableTypeName(type: string): string {
    const names: Record<string, string> = {
      cigarette: 'Cigarettes',
      cigarillos: 'Cigarillos',
      cigar: 'Cigares',
      tobacco: 'Tabac à fumer',
    };
    return names[type] || type;
  }
}
