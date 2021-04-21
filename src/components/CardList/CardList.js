import {useEffect, useState} from 'react';

import './CardList.css';

import CardItem from '../CardItem';

const cardList = props => {
  if (!props.cards) {
    return <p>There are no any cards</p>;
  }
  const cards = props.cards.map((card, index) => {
    const data = {
      ...card,
      id: card.rank + index,
      name: `${card.suit}-${card.rank}`
    };

    return (
      <CardItem card={data} 
                key={card.rank + index}
                cardClickHandler={props.cardClickHandler} 
                guessedCards={props.guessedCards}
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