import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { MimeTypes } from '../../common/enums/mimeTypes';

export const putFeedbackValidator = z.object({
  params: z.object({
    feedbackId: z
      .string({
        required_error: "L'id du feedback est requis",
      })
      .uuid(),
  }),
  body: z.object({
    comment: z.string().min(10, 'Le commentaire doit contenir au moins 10 caractères'),
  }),
  file: z
    .any()
    .refine((file) => file?.fieldname, 'Image is required.')
    .refine((file) => file?.originalname, 'Image is required.')
    .refine((file) => file?.encoding, 'Image is required.')
    .refine(
      (file) => file?.size <= 10 * 1024 * 1024,
      "La taille de l'image ne doit pas dépasser 10Mo",
    )
    .refine(
      (file) => Object.values(MimeTypes).includes(file?.mimetype),
      '.jpg, .jpeg, .png, .pdf files are accepted.',
    )
    .refine((files) => files?.buffer instanceof Buffer, 'File is not a buffer.')
    .optional(),
});

export type PutFeedbackRequest = z.infer<typeof putFeedbackValidator>;

export default buildValidationMiddleware(putFeedbackValidator);
