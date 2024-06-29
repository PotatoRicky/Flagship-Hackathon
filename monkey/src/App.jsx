import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import banana from './banana.jpg';
import sleeping from './monkey/sleeping.jpeg'
import closed from './monkey/closed.png'
import open from './monkey/open.png'
import cymbal from './crash.mp3'

function spawnBanana () {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const bananaHeight = Math.floor(Math.random() * (screenHeight - 40));
  const bananaWidth = Math.floor(Math.random() * (screenWidth - 40));
  return { bananaHeight, bananaWidth };
}



function disableBanana() {
  const banana = document.querySelector("#banana");
  banana.style.width = 0;
  banana.style.height = 0;
}


function App() {
  const { minutes, seconds } = useTimer();
  const { bananaHeight, bananaWidth } = useMemo(() => spawnBanana(), []);
  const [count, setCount] = useState(0);
  const [monkeyState, setMonkeyState] = useState(sleeping);

  function changeBanana () {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const bananaHeight = Math.floor(Math.random() * (screenHeight - 40));
    const bananaWidth = Math.floor(Math.random() * (screenWidth - 40));
    const banana = document.querySelector("#banana");
    banana.style.top = `${bananaHeight}px`;
    banana.style.left = `${bananaWidth}px`;
    setCount(count + 1);
  }

  function useTimer() {
    const startSeconds = 6;
    const [time, setTime] = useState(startSeconds);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (time > 0) {
          setTime(time => time - 1);
        } else if (time === 0) {
          document.querySelector("#timer").innerHTML = '';
          wakeMonkey()
          setTime(-1)
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [time]);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
  
    return { minutes, seconds };
  }

  function wakeMonkey() {
    setMonkeyState(open);
  }

  function sleepMonkey() {
    setMonkeyState(sleeping);
  }

  function playSound() {
    var audio = new Audio(cymbal);
    audio.play();
  }

  useEffect(() => {
    if (count >= 20) {
      disableBanana();
      sleepMonkey();
    }
  },[count])

  useEffect(() => {
    const toggleState = setInterval(() => {
      if (monkeyState === sleeping) {
        
      } else if (monkeyState === open) {
        setMonkeyState(closed);
        playSound();
      } else if (monkeyState === closed) {
        setMonkeyState(open);
      }
    }, 1000);
     return () => clearInterval(toggleState);
  }, [monkeyState])

  return (
    <>
      <div className="App" style={{flexDirection: 'column'}}>
        <img id="monkey" alt="monkey" src={monkeyState} style={{
          height: '484px',
          alignSelf: 'center',
        }}>

        </img>
        <p id="timer">{minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
        <img src={banana} alt='banana' id='banana' style={{
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