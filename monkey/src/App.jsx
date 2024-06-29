import React, { useState, useEffect } from 'react';
import './App.css';
import banana from './banana.jpg';

function spawnBanana () {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const bananaHeight = Math.floor(Math.random() * (screenHeight - 40));
  const bananaWidth = Math.floor(Math.random() * (screenWidth - 40));
  return { bananaHeight, bananaWidth };
}

function useTimer() {
  const startSeconds = 600;
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
  const { bananaHeight, bananaWidth } = spawnBanana();
  return (
    <>
      <div className="App">
        <p id="timer">{minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
        <img src={banana} alt='banana' style={{
          position: 'absolute',
          top: `${bananaHeight}px`,
          left: `${bananaWidth}px`,
          width: '40px', 
          height: '40px'
          }}></img>
      </div>
    </>
  );
}

export default App;
