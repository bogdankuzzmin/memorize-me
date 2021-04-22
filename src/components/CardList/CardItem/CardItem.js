import {Fragment, useEffect, useState} from 'react';

import './CardItem.css';

const CardItem = props => {
  const {rank, suit, name} = props.card;
  const {guessedCards, cardClickHandler, stopGame} = props;

  const [showCard, setShowCard] = useState(false);
  const [touchedCard, setTouchedCard] = useState(false);

  useEffect(() => {
    if (guessedCards === name) {
      setShowCard(true);
    }

    if (guessedCards=== 'nothing') {
      setTouchedCard(false);
    }
    
    let interval = null;
    if (touchedCard) {
      interval = setTimeout(() => setTouchedCard(false), 5000);
    }

    return () => clearTimeout(interval);
  }, [guessedCards, touchedCard, showCard]);

  const clickCardShowHandler = () => {
    setTouchedCard(true);
    cardClickHandler(name);
  };

  let card = (
    <Fragment>
      <div className="card-item__top-left">
        <div className={`card-item__rank card-item__rank--${suit}`}>{rank}</div>
        <div className={`card-item__suit card-item__suit--${suit}`}></div>
      </div>
      <div className="card-item__bottom-right">
        <div className={`card-item__rank card-item__rank--${suit}`}>{rank}</div>
        <div className={`card-item__suit card-item__suit--${suit}`}></div>
      </div>
      <div className={`card-item__suit-center card-item__suit--${suit}`}></div>
      <div className={`${(!touchedCard) && 'card-item__back-card card-item__back-card--closed'} 
                       ${showCard && 'card-item__back-card card-item__back-card--guessed'}
                       ${stopGame && 'card-item__back-card card-item__back-card--desabled'}`}>
      </div>
    </Fragment>
  );

  return (
    <li className="card-item" 
        onClick={(!touchedCard && !showCard) ? clickCardShowHandler : () => {}}>
      {card}
    </li>
  );
};

export default CardItem;