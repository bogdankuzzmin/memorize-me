import {GameLevel} from './constants';

export const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

export const getCards = (cards) => {
  const shuffledCards = cards.slice(0, GameLevel.normal);
  const copiedCards = [...shuffledCards];

  return shuffleArray(shuffledCards.concat(copiedCards));
};