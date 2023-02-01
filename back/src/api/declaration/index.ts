import { Router } from 'express';
import { getSimulation } from './getSimulation';

export default Router().use(getSimulation);
