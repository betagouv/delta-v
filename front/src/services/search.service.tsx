import { ReactElement } from 'react';

import Fuse from 'fuse.js';
import * as ReactDOMServer from 'react-dom/server';

import { AccordionData } from '@/components/common/Accordion/Accordion';
import { SearchType } from '@/utils/search';
import { getWord, shorten } from '@/utils/string';

export interface SearchData extends AccordionData {
  path: string;
  pageTitle: string;
  pageDescription: React.ReactNode;
}

const extractMatchedData = (
  matches?: readonly Fuse.FuseResultMatch[],
): { value: string; wordValue: string; position: Fuse.RangeTuple } | undefined => {
  const matchedData = matches?.[0];
  if (!matchedData?.value) {
    return;
  }
  const usedIndex = matchedData.indices
    .map((index) => index)
    .sort(
      (indexA: Fuse.RangeTuple, indexB: Fuse.RangeTuple) =>
        indexB[1] - indexB[0] - indexA[1] - indexA[0],
    )[0];
  if (!usedIndex) {
    return;
  }

  const wordValue = getWord(matchedData.value, usedIndex);
  const { value, worldPosition } = shorten(matchedData.value, usedIndex, 30);

  // eslint-disable-next-line consistent-return
  return {
    value,
    wordValue,
    position: worldPosition,
  };
};

export const fuzzySearch = (
  query: string,
  searchList: SearchData[],
  keys: string[],
): SearchType<SearchData>[] => {
  const newSearchList = searchList.map((searchElement) => {
    return {
      ...searchElement,
      answer: searchElement.answer
        ? ReactDOMServer.renderToString(searchElement.answer as ReactElement)
        : '',
    };
  });

  const fuse = new Fuse(newSearchList, {
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    distance: 10000,
    threshold: 0.2,
    keys,
  });

  const results = fuse.search(query);

  return results.map((result) => {
    const { item, score, matches } = result;
    const rankedValue = extractMatchedData(matches);

    return {
      ...item,
      rankedValue: rankedValue?.value ?? '',
      rankedPosition: rankedValue?.position,
      rank: score ?? 0,
    };
  });
};
