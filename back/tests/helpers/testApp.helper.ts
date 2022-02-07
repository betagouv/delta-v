import { buildTestAppHelper } from '../../src/core/testHelpers';
import buildApp from '../../src/loader/app';

export default buildTestAppHelper(buildApp, '/api');
