import { Router } from 'express';
import { login } from './login';
import { register } from './register';

export default Router().use(login).use(register);
