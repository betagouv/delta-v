import { object, string } from 'yup';

export const FAVORITE_MAXIMUM_NAME_LENGTH = 30;
export const FAVORITE_MINIMUM_NAME_LENGTH = 3;

export const getSchema = () => {
  return object({
    name: string()
      .min(FAVORITE_MINIMUM_NAME_LENGTH, `${FAVORITE_MINIMUM_NAME_LENGTH} caractères minimum`)
      .max(FAVORITE_MAXIMUM_NAME_LENGTH, '')
      .required('Vous devez renseigner le nom du produit'),
  }).required();
};
