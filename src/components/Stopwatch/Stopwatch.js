import {useEffect, useState} from 'react';

const Stopwatch = props => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (props.startGame) {
      if (!props.stopGame) {
        interval = setInterval(startStopwatch, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [seconds, minutes, props.startGame]);

  
  const startStopwatch = () => {
    setSeconds((prevState) => prevState + 1);

    if (seconds > 59) {
      setMinutes((prevState) => prevState + 1);

      setSeconds(0);
    }
  };

  const min = minutes <= 9 ? `0${minutes}`: minutes;
  const sec = seconds <= 9 ? `0${seconds}` : seconds;

  return (
    <div>
      <span>Time: </span>
      <span style={{marginRight: '10px'}}>{min} min.</span>
      <span>{sec} sec.</span>
    </div>
  );
};

export default Stopwatch;