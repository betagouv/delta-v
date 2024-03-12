/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ZodTypeAny, z } from 'zod';

export type Validation = Record<string, z.ZodTypeAny>;
export type ZodOutput<T extends Validation> = z.ZodObject<T>['_output'];

/**
 * Function to validate process.env. It will throw an error if the validation fails.
 * @param validationSchema Validation schema
 * @returns Validated process.env
 */
export const envConfigParser = <T extends Validation>(
  validationSchema: z.ZodObject<T>,
): ZodOutput<T> => {
  try {
    return validationSchema.parse(process.env);
  } catch (error) {
    console.error('Error while parsing env variables:');
    throw error;
  }
};

export const parseNumber = <T extends ZodTypeAny>(schema: T) => {
  return z.preprocess((obj) => {
    if (typeof obj === 'string') {
      return parseInt(obj, 10);
    }
    return obj;
  }, schema);
};

export const parseBoolean = <T extends ZodTypeAny>(schema: T) => {
  return z.preprocess((obj) => {
    if (typeof obj === 'string') {
      return obj === 'true';
    }
    return obj;
  }, schema);
};

export const parseArray = <T extends ZodTypeAny>(schema: T) => {
  return z.preprocess((obj) => {
    if (Array.isArray(obj)) {
      return obj;
    } else if (typeof obj === 'string') {
      return obj.split(',');
    } else {
      return [];
    }
  }, z.array(schema));
};
