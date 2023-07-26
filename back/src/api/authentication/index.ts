import { Router } from 'express';
import { login } from './login';
import { register } from './register';
import { validateEmail } from './validateEmail';
import { askEmailValidation } from './askEmailValidation';
import { resetPassword } from './resetPassword';
import { askResetPassword } from './askResetPassword';
import { refresh } from './refresh';
import { updatePassword } from './updatePassword';

export default Router()
  .use(login)
  .use(refresh)
  .use(register)
  .use(validateEmail)
  .use(askResetPassword)
  .use(askEmailValidation)
  .use(updatePassword)
  .use(resetPassword);
