import { StringSchema } from 'joi';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { config } from '../../../loader/config';
import { emailDouaneRegex, passwordRegex } from '../common/const/regex';

export interface IRegisterRequest {
  body: {
    email: string;
    password: string;
  };
}

const emailValidatorAlternatives = (): StringSchema<string>[] => {
  const alternatives: StringSchema<string>[] = [];
  if (config.WHITE_LIST_AGENT_EMAIL.length > 0) {
    alternatives.push(
      validator
        .string()
        .valid(...config.WHITE_LIST_AGENT_EMAIL)
        .messages({
          'any.allowOnly': 'L\'email doit appartenir au domaine "@douane.finances.gouv.fr"',
        }),
    );
  }

  alternatives.push(
    validator.string().regex(emailDouaneRegex).messages({
      'string.pattern.base': 'L\'email doit appartenir au domaine "@douane.finances.gouv.fr"',
    }),
  );

  return alternatives;
};

export const registerValidator = {
  body: validator.object({
    email: validator.alternatives(emailValidatorAlternatives()).required().messages({
      'string.empty': "L'email est requis",
    }),
    password: validator.string().regex(passwordRegex).required().messages({
      'string.empty': 'Le mot de passe est requis',
      'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé',
    }),
  }),
};

export default buildValidationMiddleware(registerValidator);
