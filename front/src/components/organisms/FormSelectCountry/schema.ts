import * as yup from 'yup';

export const SelectCountrySchema = yup.object({
  countryName: yup.string().required(),
  countryCode: yup.string().required(),
});

export type SelectCountrySchemaType = yup.InferType<typeof SelectCountrySchema>;
