import React from 'react';

import { Icon } from '@/components/atoms/Icon';

export type SearchHistoryItemProps = {
  matchingValue: string;
  category?: string;
  searchStart?: number;
  searchEnd?: number;
};

const splitString = (string: string, startPosition: number, endPosition: number) => {
  const partOne = string.substring(0, startPosition);
  const partTwo = string.substring(startPosition, endPosition);
  const partThree = string.substring(endPosition);
  const splittedString = {
    partOne,
    partTwo,
    partThree,
  };
  return splittedString;
};

export const SearchHistoryItem = ({
  matchingValue,
  category,
  searchStart,
  searchEnd,
}: SearchHistoryItemProps) => {
  const splittedString =
    searchStart && searchEnd && splitString(matchingValue, searchStart, searchEnd);

  return (
    <div className="flex h-5 gap-3">
      <span className="text-primary-700">
        <Icon name="search" />
      </span>
      <span>
        {splittedString ? (
          <>
            <span className="text-black">{splittedString.partOne}</span>
            <span className="font-bold text-black">{splittedString.partTwo}</span>
            <span className="text-black">{splittedString.partThree}</span>
          </>
        ) : (
          <span className="text-black">{matchingValue}</span>
        )}
        {category && (
          <React.Fragment>
            <span className="text-gray-400"> dans </span>
            <span className="text-primary-700">{category}</span>
          </React.Fragment>
        )}
      </span>
    </div>
  );
};
