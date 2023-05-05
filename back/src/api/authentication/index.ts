import { Router } from 'express';
import { login } from './login';
import { register } from './register';
import { validateEmail } from './validateEmail';

export default Router().use(login).use(register).use(validateEmail);
