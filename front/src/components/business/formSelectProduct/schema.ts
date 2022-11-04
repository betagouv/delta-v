import { object, string, number } from 'yup';

const patternTwoDigitalAfterComma = /^\d+(\.\d{0,2})?$/;

const getValue = (amountProduct: boolean): any => {
  if (amountProduct) {
    return number()
      .typeError('Vous devez renseigner la quantité du produit.')
      .min(1, 'La quantité de produit ne peut pas être inférieur à 1.')
      .integer('Veuillez entrer une valeur entière.')
      .required('Vous devez renseigner la quantité du produit.');
  }
  return number()
    .typeError('La valeur du produit doit être un nombre')
    .transform((_value, originalValue) => {
      if (!originalValue) {
        return undefined;
      }
      return Number(originalValue.replace(/,/, '.'));
    })
    .min(0, 'La valeur du produit ne doit pas être négative.')
    .test('is-decimal', 'Le nombre de décimal après la virgule est de deux maximum', (val: any) => {
      if (val !== undefined) {
        return patternTwoDigitalAfterComma.test(val);
      }
      return true;
    })
    .required('Vous devez renseigner la valeur du produit.');
};

const getCurrency = (currency: boolean): any => {
  if (currency) {
    return undefined;
  }
  return string().required('Veuillez séléctoinner la devise.');
};

export const getSchema = (amountProduct = false) => {
  return object({
    name: string().optional(),
    value: getValue(amountProduct),
    currency: getCurrency(amountProduct),
  }).required();
};
