import {Link} from 'react-router-dom';

import './GamePage.css';

import CardList from '../CardList';
import Stopwatch from '../Stopwatch';

const gamePage = props => {
  let finishBlock;
  if (props.stopGame) {
    finishBlock = (
      <div className="game-page__finish">
        <p className="game-page__finish-text">Great Job!</p>
        <Link to="/results" className="game-page__button" onClick={props.resetGame}>Results</Link>
        <Link to="/" className="game-page__button" onClick={props.resetGame}>Home</Link>
      </div>
    );
  }

  return (
    <section className="game-page">
      <h1 className="visually-hidden">Memorize Me</h1>

      <div className="game-page__row">
        <div className="game-page__left-column">
          <CardList cards={props.cards}
                    stopGame={props.stopGame}
                    cardClickHandler={props.cardClickHandler} 
                    guessedCards={props.guessedCards} />
        </div>
        <div className="game-page__right-column">
          <Stopwatch startGame={props.startGame}
                     stopGame={props.stopGame}
                     scoreHandler={props.scoreHandler} />

          
          <p>Fails: {props.fails}</p>

          {finishBlock}
        </div>
      </div>
    </section>
  );
};

export default gamePage;