import { Router } from 'express';
import { login } from './login';
import { register } from './register';
import { validateEmail } from './validateEmail';
import { askEmailValidation } from './askEmailValidation';

export default Router().use(login).use(register).use(validateEmail).use(askEmailValidation);
