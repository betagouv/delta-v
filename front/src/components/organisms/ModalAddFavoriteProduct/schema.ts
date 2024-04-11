import { object, string } from 'yup';

export const FAVORITE_MAXIMUM_NAME_LENGTH = 30;

export const getSchema = () => {
  return object({
    name: string()
      .min(1, 'Vous devez renseigner le nom du produit')
      .max(FAVORITE_MAXIMUM_NAME_LENGTH, '')
      .required('Vous devez renseigner le nom du produit'),
  }).required();
};
