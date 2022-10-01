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

export const getWord = (str: string, position: number) => {
  const separator = /[\s;,.()"“”]+/g;
  const start = str.lastIndexOf(' ', position);
  const end =
    regexIndexOf(str, separator, position) !== -1
      ? regexIndexOf(str, separator, position)
      : str.length;
  return str.substring(start, end);
};

export const shorten = (
  str: string,
  position: number,
  distance: number,
  separator = /[\s;,.()"“”]+/g,
): { value: string; worldPosition: [number, number] } => {
  const closeToStart = position - distance < 0;
  const closeToEnd = position + distance > str.length;
  const startValue = closeToStart ? '' : '...';
  const endValue = closeToEnd ? '' : '...';
  if (str.length <= distance) {
    const start = regexLastIndexOf(str, separator, position);
    const end =
      regexIndexOf(str, separator, position) !== -1
        ? regexIndexOf(str, separator, position)
        : str.length;
    return { value: str, worldPosition: [start, end] };
  }

  const substring = str.substring(position - distance, position + distance);

  const newPosition =
    position > distance ? distance - regexIndexOf(substring, separator) : position;

  const value = substring.substring(
    closeToStart ? 0 : regexIndexOf(substring, separator) + 1,
    closeToEnd ? substring.length : regexLastIndexOf(substring, separator),
  );
  const start = regexLastIndexOf(value, separator, newPosition) + startValue.length;
  const end =
    regexIndexOf(value, separator, newPosition) !== -1
      ? regexIndexOf(value, separator, newPosition) + startValue.length
      : value.length;
  return {
    value: `${startValue}${value}${endValue}`,
    worldPosition: [start, end],
  };
};
