import './CardList.css';

import CardItem from './CardItem';

const cardList = props => {
  const cards = props.cards.map((card, index) => {
    const data = {
      ...card,
      name: `${card.suit}-${card.rank}`
    };

    return (
      <CardItem card={data} 
                key={card.rank + index}
                cardClickHandler={props.cardClickHandler} 
                guessedCards={props.guessedCards}
                stopGame={props.stopGame}
                />
    );
  });

  return (
    <ul className="card-list">
      {cards}
    </ul>
  );
};

export default cardList;