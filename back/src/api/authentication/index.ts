import { Router } from 'express';
import { login } from './login';

export default Router().use(login);
