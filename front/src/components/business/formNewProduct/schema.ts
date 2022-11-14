import { object, string, number } from 'yup';

const patternTwoDigitalAfterComma = /^\d+(\.\d{0,2})?$/;

const getValue = (): any => {
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

export const getSchema = () => {
  return object({
    name: string().required('Vous devez renseigner le nom du produit.'),
    value: getValue(),
    category: string().required('Veuillez séléctionner la catégorie.'),
    currency: string().required('Veuillez séléctionner la devise.'),
  }).required();
};
