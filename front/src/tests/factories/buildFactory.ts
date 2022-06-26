/**
 * Builder of random data factory. Helps to create object for test purposes.
 */
export function buildFactory<T>(schema: T) {
  return (args?: Partial<T>): T => ({
    ...schema,
    ...args,
  });
}
