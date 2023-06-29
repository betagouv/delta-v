import { buildValidationMiddleware, IRequestValidatorSchema } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface PutFeedbackRequest {
  params: {
    feedbackId: string;
  };
  body: {
    comment: string;
  };
}

export const putFeedbackValidator: IRequestValidatorSchema = {
  params: validator
    .object({
      feedbackId: validator.string().uuid().required(),
    })
    .required(),
  body: validator
    .object({
      comment: validator.string().min(10).required(),
    })
    .required(),
};

export default buildValidationMiddleware(putFeedbackValidator);
