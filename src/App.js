import {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from './axios-results';

import './App.css';

import {getCards} from './units';
import {allCards, GameLevel} from './constants';

import StartPage from './components/StartPage';
import Results from './components/Results';
import GamePage from './components/GamePage';

const App = props => {
  const [cards, setCards] = useState(new Array);
  const [comparedCards, setComparedCards] = useState(new Array);
  const [guessedCards, setGuessedCards] = useState('');

  const [gameCounter, setGameCounter] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [stopGame, setStopGame] = useState(false);

  const [player, setPlayer] = useState('');
  const [playerScore, setPlayerScore] = useState('');
  const [fails, setFails] = useState(0);

  useEffect(() => {
    if (cards.length === 0) {
      setCards(getCards(allCards));
    }

    if (gameCounter === GameLevel.normal) {
      setStopGame(true);
      sendResults();
    }

    if (!player) {
      setPlayer(localStorage.getItem('name'));
    }

    setGuessedCards('');

    if (comparedCards.length === 2) {
      if (comparedCards[0] === comparedCards[1]) {
        setGuessedCards(comparedCards[0]);
        setGameCounter(gameCounter+1);
      } else {
        setGuessedCards('nothing');
        setFails(fails + 1);
      }

      setComparedCards([]);
    }

    let interval = null;

    if (comparedCards.length === 1) {
      interval = setTimeout(() => setComparedCards([]), 5000);

    }

    return () => clearTimeout(interval);
    
  }, [comparedCards]);

  

  const cardClickHandler = (nameCard) => {
    setComparedCards(comparedCards.concat(nameCard));
  };

  const changePlayerNameHandler = (event) => {
    setPlayer(event.target.value);
    localStorage.setItem('name', event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setStartGame(true);
  };

  const sendResults = () => {
    const resultData = {
      name: player,
      time: playerScore,
      fail: fails
    };

    console.log(resultData);
    axios.post('/results.json', resultData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('something went wrong');
      });
  };

  const playerScoreHandler = (minutes, seconds) => {
    setPlayerScore(`${minutes}:${seconds}`);
  };

  const resetGame = () => {
    setCards(new Array);
    setComparedCards(new Array);
    setGuessedCards('');
    setGameCounter(0);
    setStartGame(false);
    setStopGame(false);
    setPlayerScore('');
    setFails(0);
  };

  let renderStartGame = (
    <StartPage submitHandler={submitHandler} 
                changePlayerNameHandler={changePlayerNameHandler} 
                nameValue={player} />
  );

  if (startGame) {
    renderStartGame = <GamePage cards={cards}
                                cardClickHandler={cardClickHandler} 
                                guessedCards={guessedCards} 
                                startGame={startGame}
                                stopGame={stopGame}
                                resetGame={resetGame}
                                scoreHandler={playerScoreHandler}
                                fails={fails} />

  }

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          {renderStartGame}
        </Route>
        
        <Route path="/results">
          <Results />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
