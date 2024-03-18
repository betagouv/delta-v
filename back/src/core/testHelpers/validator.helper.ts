/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { AnyZodObject, SafeParseReturnType } from 'zod';

export interface IValidatorHelper {
  isValid: (args: any) => boolean;
  getParsedData: (args: any) => any;
}

const useValidator = (
  schema: AnyZodObject,
  args: any,
): SafeParseReturnType<
  {
    [x: string]: any;
  },
  {
    [x: string]: any;
  }
> => {
  return schema.safeParse(args);
};

export function validatorHelper(schema: AnyZodObject): IValidatorHelper {
  return {
    isValid: (args): boolean => useValidator(schema, args).success,
    getParsedData: (args): any => {
      const result = useValidator(schema, args);
      if (!result.success) {
        throw result.error;
      }

      return result.data;
    },
  };
}
