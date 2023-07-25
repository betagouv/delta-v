export const searchRegex = (search: string) => {
  return new RegExp(`(${search})`, 'gi');
};
