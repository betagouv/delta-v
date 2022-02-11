import { ConnectionOptions } from 'typeorm';
import { buildConnectionOptions } from './database';

const options: ConnectionOptions = buildConnectionOptions();

export = options;
