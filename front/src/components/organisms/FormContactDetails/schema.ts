import { object, string } from 'yup';

export const getSchema = () => {
  return object({
    lastName: string()
      .required('Le nom est requis')
      .min(2, 'Le nom doit contenir au moins 2 caractères'),
    firstName: string()
      .required('Le prénom est requis')
      .min(2, 'Le prénom doit contenir au moins 2 caractères'),
    address: string()
      .required("L'adresse est requise")
      .min(2, "L'adresse doit contenir au moins 2 caractères"),
    city: string()
      .required('La ville est requise')
      .min(2, 'La ville doit contenir au moins 2 caractères'),
    postalCode: string()
      .required('Le code postal est requis')
      .min(5, 'Le code postal doit contenir 5 chiffres')
      .max(5, 'Le code postal doit contenir 5 chiffres')
      .matches(/^[0-9]{5}$/, "Le code postal n'est pas valide"),
    email: string().required("L'email est requis").email('Mail invalide'),
    phoneNumber: string()
      .min(10, 'Le numéro de téléphone doit contenir 10 chiffres')
      .required('Le numéro de téléphone est requis')
      .matches(
        /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
        "Le numéro de téléphone n'est pas valide",
      ),
  }).required();
};
