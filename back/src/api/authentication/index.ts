import { Router } from 'express';
import { login } from './login';
import { register } from './register';
import { validateEmail } from './validateEmail';
<<<<<<< HEAD
import { askEmailValidation } from './askEmailValidation';

export default Router().use(login).use(register).use(validateEmail).use(askEmailValidation);
=======

export default Router().use(login).use(register).use(validateEmail);
>>>>>>> 7972cd9 (validate email endpoint)
