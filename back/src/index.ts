import bootstrap from './loader';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {}
}

bootstrap();
