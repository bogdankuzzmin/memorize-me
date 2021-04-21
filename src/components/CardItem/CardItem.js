import {Fragment, useEffect, useState} from 'react';

import './CardItem.css';

const CardItem = props => {
  const {rank, suit, name} = props.card;

  const [show, setShow] = useState(false);
  const [touch, setTouch] = useState(false);


  useEffect(() => {
    console.log(props.guessedCards);
    if (props.guessedCards === name) {
      setShow(true);
    }

    if (props.guessedCards=== 'nothing') {

      setTouch(false);
    }
    
    let interval = null;
    if (touch) {
      interval = setTimeout(() => setTouch(false), 5000);
    }

    return () => clearTimeout(interval);
  }, [props.guessedCards, touch, show]);

  const clickCardShowHandler = () => {
    console.log(`click`);
    //setShow(true);
    setTouch(true);
    props.cardClickHandler(name);

  };


  let card = (
    <Fragment>
      <div className="top-left">
        <div className={`rank rank--${suit}`}>{rank}</div>
        <div className={`suit ${suit}`}></div>
      </div>
      <div className="bottom-right">
        <div className={`rank rank--${suit}`}>{rank}</div>
        <div className={`suit ${suit}`}></div>
      </div>
      <div className={`suit-center ${suit}`}></div>
      <div className={`${(!touch) && 'close'} ${show && 'open'}`}></div>
    </Fragment>
  );

  return (
    <li className={`card-item ${(!touch) && 'closed-card'} ${show && 'guessed-card'}`} onClick={(!touch && !show) ? clickCardShowHandler : () => {}}>
      {card}
    </li>
  );
};

export default CardItem;