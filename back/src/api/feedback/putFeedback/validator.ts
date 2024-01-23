import { buildValidationMiddleware, IRequestValidatorSchema } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { MimeTypes } from '../../common/enums/mimeTypes';

export interface PutFeedbackRequest {
  params: {
    feedbackId: string;
  };
  body: {
    comment: string;
  };
  file?: Express.Multer.File;
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
  file: validator
    .object({
      fieldname: validator.string().required(),
      originalname: validator.string().required(),
      encoding: validator.string().required(),
      mimetype: validator.string().valid(MimeTypes.JPEG, MimeTypes.PNG).required(),
      buffer: validator.binary().required(),
      size: validator
        .number()
        .max(10 * 1024 * 1024) //10mo
        .required(),
    })
    .optional(),
};

export default buildValidationMiddleware(putFeedbackValidator);
