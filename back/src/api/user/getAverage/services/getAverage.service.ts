export const getAverage = (arrayNumber: number[]): number => {
  const nbValues = arrayNumber.length;
  if (nbValues === 0) {
    return 0;
  }
  const sum = arrayNumber.reduce((currentNumber, accumulator) => accumulator + currentNumber, 0);

  return sum / nbValues;
};
