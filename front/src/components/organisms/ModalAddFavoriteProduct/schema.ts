import { object, string } from 'yup';

export const getSchema = () => {
  return object({
    name: string().max(30).required('Vous devez renseigner le nom du produit.'),
  }).required();
};
