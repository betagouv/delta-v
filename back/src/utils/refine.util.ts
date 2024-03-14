import { RefinementCtx, z } from 'zod';
import { validateMeanOfTransports, validateNewsTags, validateStatus } from './joiCustomValidators';

interface IRefineValidateMeanOfTransports {
  meanOfTransports?: string;
  customError: RefinementCtx;
}
interface IRefineValidateStatus {
  status?: string;
  customError: RefinementCtx;
}
interface IRefineValidateNewsTags {
  tags?: string;
  customError: RefinementCtx;
}
interface IRefineValidateBorder {
  border: boolean | string;
  contextError: RefinementCtx;
}

export const refineValidateStatus = ({
  status,
  customError,
}: IRefineValidateStatus): boolean | void => {
  if (status) {
    const { isValid, messages } = validateStatus(status);
    if (!isValid) {
      messages.map((message) =>
        customError.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['status'],
          message: message,
        }),
      );
    } else {
      return true;
    }
  }
};

export const refineValidateMeanOfTransports = ({
  meanOfTransports,
  customError,
}: IRefineValidateMeanOfTransports): boolean | void => {
  if (meanOfTransports) {
    const { isValid, messages } = validateMeanOfTransports(meanOfTransports);
    if (!isValid) {
      messages.map((message) =>
        customError.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['meanOfTransports'],
          message: message,
        }),
      );
    }
    return true;
  }
  return true;
};

export const refineValidateNewsTags = ({
  tags,
  customError,
}: IRefineValidateNewsTags): boolean | void[] => {
  if (tags) {
    const { isValid, messages } = validateNewsTags(tags);
    if (!isValid) {
      return messages.map((message) =>
        customError.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['tags'],
          message: message,
        }),
      );
    }
    return true;
  }
  return true;
};

export const refineValidateBorder = ({
  border,
  contextError,
}: IRefineValidateBorder): boolean | void => {
  if (typeof border === 'boolean') {
    return true;
  }
  if (typeof border === 'string' && ['true', 'false'].includes(border)) {
    return true;
  }
  contextError.addIssue({
    code: z.ZodIssueCode.custom,
    path: ['border'],
    message: 'border must be a boolean or a string "true" or "false"',
  });
};
