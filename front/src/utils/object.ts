export const isObjectEmpty = (obj: Record<any, any>): boolean => {
  if (obj && Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }
  return false;
};
