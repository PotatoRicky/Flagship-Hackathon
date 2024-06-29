import React, { useState, useEffect } from 'react';
import './App.css';

function useTimer() {
  const startSeconds = 10;
  const [time, setTime] = useState(startSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time => time - 1);
      } else if (time === 0) {
        document.querySelector("#timer").innerHTML = '';
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return { minutes, seconds };
}

function App() {
  const { minutes, seconds } = useTimer();
  return (
    <div className="App">
      <p id="timer">{minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
    </div>
  );
}

export default App;
