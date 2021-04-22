import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from '../../axios-results';

import './Results.css';

import Loader from '../Loader';
import ResultItem from './ResultItem';

const Results = props => {
  const [results, setResults] = useState(new Array);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    axios.get('/results.json')
      .then((response) => {
        const fetchResults = new Array;

        for (let key in response.data) {
          const minutes = response.data[key].time.split(':')[0];
          const seconds = response.data[key].time.split(':')[1];

          fetchResults.push({
            ...response.data[key],
            sortTime: Number(minutes) * 60 + Number(seconds)
          });
        }

        const sortedResults = [...fetchResults].sort((a, b) => a.sortTime - b.sortTime);

        setResults(sortedResults);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  
  if (!results) {
    return <p>There are no any results</p>
  }

  const result = results.map((result, index) => {
    const resultData = {
      ...result,
      index: index + 1,
    };

    return <ResultItem key={index} result={resultData} />
  });

  let table = loading ? <Loader /> : (
    <table className="results__table">
      <thead>
        <tr>
          <th>№</th>
          <th>Name</th>
          <th>Time</th>
          <th>Fails</th>
        </tr>
      </thead>
      <tbody>
        {result}
      </tbody>
   </table>
  );

  return (
    <section className="results">
      <h2 className="results__title">Results</h2>

      <div className="results__wrapper">
        <Link to="/" className="results__button">Home</Link>
        {table}
      </div>

    </section>
  );
};

export default Results;
