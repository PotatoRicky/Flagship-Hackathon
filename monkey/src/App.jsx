import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import banana from './banana.jpg';

function spawnBanana() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const bananaHeight = Math.floor(Math.random() * (screenHeight - 40));
  const bananaWidth = Math.floor(Math.random() * (screenWidth - 40));
  return { bananaHeight, bananaWidth };
}

function changeBanana() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const bananaHeight = Math.floor(Math.random() * (screenHeight - 40));
  const bananaWidth = Math.floor(Math.random() * (screenWidth - 40));
  const banana = document.querySelector("#banana");
  banana.style.top = `${bananaHeight}px`;
  banana.style.left = `${bananaWidth}px`;
}

function disableBanana () {
  const banana = document.querySelector("#banana");
  banana.style.width = 0;
  banana.style.height = 0;
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

<<<<<<< HEAD
function disableBanana () {
  const banana = document.querySelector("#banana");
  banana.style.width = 0;
  banana.style.height = 0;
}

=======
>>>>>>> d1d99d67119dd2d35c403a1373f6ce43cc07697c
function App() {
  const { minutes, seconds } = useTimer();
  const { bananaHeight, bananaWidth } = useMemo(() => spawnBanana(), []);

  return (
    <>
      <div className="App">
        <p id="timer">{minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
        <img id="monkey" src ="./monkey/sleeping"></img>
        <img id="banana" src={banana} alt='banana' style={{
          position: 'absolute',
          top: `${bananaHeight}px`,
          left: `${bananaWidth}px`,
          width: '40px', 
          height: '40px'
          }} onClick={changeBanana}></img>
      </div>
    </>
  );
}

export default App;
