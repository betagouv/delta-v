export const capitalize = (word: string): string => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
};

const regexIndexOf = (text: string, regex: RegExp, position = 0): number => {
  const indexInSuffix = text.slice(position).search(regex);
  return indexInSuffix < 0 ? indexInSuffix : indexInSuffix + (position ?? 0);
};

const regexLastIndexOf = (string: string, regex: RegExp, position?: number): number => {
  const str = position ? string.substring(0, position) : string;
  const match = str.match(regex);
  if (!match) {
    return -1;
  }
  const matchValue = match[match.length - 1];
  return matchValue ? str.lastIndexOf(matchValue) : -1;
};

export const getWord = (str: string, position: [number, number]) => {
  const center = Math.floor((position[0] + position[1]) / 2);
  const separator = /[\s;,.()"“”]+/g;
  const start = str.lastIndexOf(' ', center);
  const end =
    regexIndexOf(str, separator, center) !== -1 ? regexIndexOf(str, separator, center) : str.length;
  return str.substring(start, end);
};

const getNewPosition = (
  str: string,
  position: [number, number],
  distance: number,
  separator = /[\s;,.()"“”]+/g,
): [number, number] => {
  const matchLength = position[1] - position[0];
  const newStartPosition =
    position[0] > distance ? distance - regexIndexOf(str, separator) - 1 : position[0];
  return [newStartPosition, newStartPosition + matchLength + 1];
};

export const shorten = (
  str: string,
  position: [number, number],
  distance: number,
  separator = /[\s;,.()"“”]+/g,
): { value: string; worldPosition: [number, number] } => {
  const closeToStart = position[0] - distance < 0;
  const closeToEnd = position[1] + distance > str.length;
  const startValue = closeToStart ? '' : '...';
  const endValue = closeToEnd ? '' : '...';
  if (str.length <= distance) {
    return { value: str, worldPosition: position };
  }

  const substring = str.substring(position[0] - distance, position[1] + distance);

  const newPosition: [number, number] = getNewPosition(substring, position, distance, separator);

  const value = substring.substring(
    closeToStart ? 0 : regexIndexOf(substring, separator) + 1,
    closeToEnd ? substring.length : regexLastIndexOf(substring, separator),
  );
  const start = newPosition[0] + startValue.length;
  const end = newPosition[1] + startValue.length;

  return {
    value: `${startValue}${decodeURI(value)}${endValue}`,
    worldPosition: [start, end],
  };
};
