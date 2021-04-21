export const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

export const getCards = (cards) => {
  const shuffledCards = cards.slice(0, 18);
  const copiedCards = [...shuffledCards];

  return shuffleArray(shuffledCards.concat(copiedCards));
};