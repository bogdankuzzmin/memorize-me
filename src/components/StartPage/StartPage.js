import {Link} from 'react-router-dom';

import './StartPage.css';

const startPage = props => {
  return (
    <section className="start-page">
      <h1 className="start-page__title">Memorize Me</h1>

      <div className="start-page__wrapper">
        <form className="start-page__form" onSubmit={(event) => props.submitHandler(event)}>
          <input type="text" 
                 className="start-page__input"
                 placeholder="Type your name" 
                 onChange={(event) => props.changePlayerNameHandler(event)}
                 value={props.nameValue}
                 required />

          <button type="submit" className="start-page__button">Start</button>
        </form>

        <Link to="/results" className="start-page__button start-page__button--second">Results</Link>
      </div>
    </section>
  );
};

export default startPage;