import {useEffect, useState} from 'react';

import {getCards} from './units';
import {allCards} from './constants';

import './App.css';

import CardList from './components/CardList';
import Stopwatch from './components/Stopwatch';

const App = props => {
  const [cards, setCards] = useState(new Array);
  const [comparedCards, setComparedCards] = useState(new Array);
  const [guessedCards, setGuessedCards] = useState('');

  const [gameCounter, setGameCounter] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [stopGame, setStopGame] = useState(false);

  const [player, setPlayer] = useState('');


  useEffect(() => {
    if (cards.length === 0) {
      setCards(getCards(allCards));
    }

    if (gameCounter === 2) {
      setStopGame(true);
      alert('You won! ' + player);
    }

    setGuessedCards('');

    if (comparedCards.length === 2) {
      if (comparedCards[0] === comparedCards[1]) {
        setGuessedCards(comparedCards[0]);
        setGameCounter(gameCounter+1);
      } else {
        setGuessedCards('nothing');
      }

  
      setComparedCards([]);
    }

    let interval = null;

    console.log(guessedCards);
    if (comparedCards.length === 1) {
      interval = setTimeout(() => setComparedCards([]), 5000);

    }

    return () => clearTimeout(interval);
    
  }, [comparedCards]);

  

  const cardClickHandler = (nameCard) => {
    setComparedCards(comparedCards.concat(nameCard));
  };

  const startGameHandler = (event) => {
    setStartGame(true);
  };

  let playerName = '';
  if (!startGame) {
    playerName = <input type="text" placeholder="type your name" required onChange={(event) => setPlayer(event.target.value)} />
  }

  return (
    <div className="App">
      <CardList cards={cards} 
                cardClickHandler={cardClickHandler} 
                guessedCards={guessedCards} />

      <div>
      <h1>Memorize Me</h1>

        <Stopwatch startGame={startGame} stopGame={stopGame} />

        {playerName}
        <button onClick={startGameHandler} disabled={startGame} type="submit">Start</button> 
      </div>
    </div>
  );
};

export default App;
