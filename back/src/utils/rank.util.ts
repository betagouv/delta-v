import { LexoRank } from 'lexorank';

export const getRankFromPosition = (position = 0): string => {
  let rank = LexoRank.middle();
  for (let i = 0; i < position; i++) {
    rank = rank.genNext();
  }

  return rank.toString();
};
