/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextFunction, Request, Response } from 'express';

import { AnyZodObject, ZodError } from 'zod';
import { HttpStatuses } from '../httpStatuses';

const DEFAULT_ERROR_MESSAGE = 'Bad Request';
const DEFAULT_ERROR_CODE = 'bad-request';

interface IErrorResponse {
  message: string;
  code: string;
  statusCode: number;
  context: {
    validationErrors: {
      name: string | undefined;
      message: string;
      path: (string | number)[];
      type: string;
    }[];
  };
}

const buildErrorMessage = (options: IValidationMiddlewareOptions | undefined): string =>
  options?.message ?? DEFAULT_ERROR_MESSAGE;

const buildErrorResponse = (
  error: ZodError,
  options: IValidationMiddlewareOptions | undefined,
): IErrorResponse => {
  return {
    message: buildErrorMessage(options),
    code: options?.code || DEFAULT_ERROR_CODE,
    statusCode: HttpStatuses.BAD_REQUEST,
    context: {
      validationErrors: error.issues.map((issue) => ({
        name: issue.path[issue.path.length - 1] as string,
        message: issue.message,
        path: issue.path,
        type: issue.code,
      })),
    },
  };
};

interface IExtendedRequest extends Request {
  file?: any;
}

export interface IValidationMiddlewareOptions {
  message?: string;
  code?: string;
}

// function buildValidator with schema
function buildValidator(schema: AnyZodObject): AnyZodObject {
  return schema;
}

//function validate with validator and data
export function validate(
  validator: AnyZodObject,
  data: any,
): { isValid: boolean; parsedData: any } {
  const result = validator.safeParse(data);
  if (result.success) {
    return { isValid: true, parsedData: result.data };
  }
  return { isValid: false, parsedData: result.error };
}

/**
 * Build validation middleware.
 * @param schema Joi validator schema or schema builder function (allows to use TranslationFunction when generating error messages)
 * @param options.message Message content or function that responds with message
 * @param options.code Error code
 */
export function buildValidationMiddleware(
  schema: AnyZodObject,
  options?: IValidationMiddlewareOptions,
) {
  return function validationMiddleware(
    request: IExtendedRequest,
    response: Response,
    next: NextFunction,
  ): Response | void {
    const { headers, params, query, body, cookies, file } = request;

    const validator = buildValidator(schema);

    const validationResult = validate(validator, {
      headers,
      params,
      query,
      body,
      cookies,
      file,
    });

    if (!validationResult.isValid) {
      const validationResponse = buildErrorResponse(validationResult.parsedData, options);
      return response.status(HttpStatuses.BAD_REQUEST).send(validationResponse);
    }

    request.headers = validationResult.parsedData.headers;
    request.params = validationResult.parsedData.params;
    request.query = validationResult.parsedData.query;
    request.cookies = validationResult.parsedData.cookies;
    request.body = validationResult.parsedData.body;
    request.file = validationResult.parsedData.file;

    return next();
  };
}
