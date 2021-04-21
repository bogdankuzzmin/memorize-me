import './StartPage.css';

const startPage = props => {

  return (
    <section className="start-page">
      <h1 className="start-page__title">Memorize Me</h1>

      <form className="start-page__form" onSubmit={(event) => props.submitHandler(event)}>
        <input type="text" 
               className="start-page__input"
               placeholder="Type your name" 
               onChange={(event) => props.changePlayerNameHandler(event)}
               required />

        <button type="submit" className="start-page__button">Start</button>
      </form>
    </section>
  );
};

export default startPage;