/* eslint-disable @typescript-eslint/no-explicit-any */

import Joi, { ValidationResult } from 'joi';
import { IRequestValidatorSchema } from '../middlewares';

export interface IValidatorHelper {
  isValid: (args: any) => boolean;
  getParsedData: (args: any) => any;
}

function useValidator(schema: IRequestValidatorSchema, args: any): ValidationResult {
  return Joi.object({ ...schema }).validate(args);
}

/**
 * Helper for testing joi validator schemas
 * @param schema object validator schema
 */
export function validatorHelper(schema: IRequestValidatorSchema): IValidatorHelper {
  return {
    isValid: (args): boolean => useValidator(schema, args).error === undefined,
    getParsedData: (args): any => {
      const { value, error } = useValidator(schema, args);
      if (error) {
        throw error;
      }

      return value;
    },
  };
}
