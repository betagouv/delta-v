import { object, string, number } from 'yup';

const patternThreeDigitalAfterComma = /^\d+(\.\d{0,3})?$/;

const getValue = (amountProduct: boolean): any => {
  return number()
    .typeError(
      amountProduct
        ? 'Vous devez renseigner la quantité du produit.'
        : 'La valeur du produit doit être un nombre',
    )
    .transform((_value, originalValue: number) => {
      if (!originalValue) {
        return undefined;
      }
      console.log('originalValue', originalValue);

      return Number(originalValue.toString().replace(/,/, '.'));
    })
    .moreThan(
      0,
      amountProduct
        ? 'La quantité de produit doit être supérieure à 0.'
        : 'La valeur du produit doit être supérieure à 0.',
    )
    .test(
      'is-decimal',
      'Le nombre de décimal après la virgule est de trois maximum',
      (val: any) => {
        if (val !== undefined) {
          return patternThreeDigitalAfterComma.test(val);
        }
        return true;
      },
    )
    .required(
      amountProduct
        ? 'Vous devez renseigner la quantité du produit.'
        : 'Vous devez renseigner la valeur du produit.',
    );
};

const getCurrency = (currency: boolean): any => {
  if (currency) {
    return undefined;
  }
  return string().required('Veuillez sélectionner la devise.');
};

interface GetSchema {
  amountProduct: boolean;
  withName?: boolean;
}

export const getSchema = ({ amountProduct, withName }: GetSchema) => {
  return object({
    name: withName
      ? string().required('Vous devez renseigner le nom du produit.')
      : string().optional(),
    value: getValue(amountProduct),
    currency: getCurrency(amountProduct),
  }).required();
};
