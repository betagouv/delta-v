export const getRoundedNumber = (value: number, precision = 2): number => {
  const string = String(value);
  const splitDecimal = string.split('.') as string[];
  if (splitDecimal.length === 1) {
    return parseFloat(parseFloat(`${splitDecimal[0]}`).toFixed(precision));
  }
  const sliceDecimal = `${splitDecimal[1]}`.slice(0, 2);
  if (parseFloat(sliceDecimal) < 10 ** sliceDecimal.length / 2) {
    return parseFloat(parseFloat(`${splitDecimal[0]}`).toFixed(precision));
  }
  return parseFloat((parseFloat(`${splitDecimal[0]}`) + 1).toFixed(precision));
};
