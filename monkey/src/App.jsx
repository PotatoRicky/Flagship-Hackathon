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
  const { bananaHeight, bananaWidth } = useMemo(() => spawnBanana(), []);
  const [count, setCount] = useState(0);
  const [monkeyState, setMonkeyState] = useState(sleeping);
  const startSeconds = 6;
  const [time, setTime] = useState(startSeconds);

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


  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time => time - 1);
      } else if (time === 0) {
        document.querySelector("#timer").innerHTML = '';
        wakeMonkey()
        setTime(-1);
      }
      
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      console.log(minutes)
      console.log(seconds)
      const timer = document.querySelector("#timer");
      if (timer) {
        timer.props.minutes = minutes;
        timer.props.seconds = seconds;
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    const toggleState = setInterval(() => {
      if (monkeyState === sleeping) {
        // do nothing
      } else if (monkeyState === open) {
        setMonkeyState(closed);
      } else if (monkeyState === closed) {
        setMonkeyState(open);
        playSound();
      }
    }, 500);
    return () => clearInterval(toggleState);
  })

  function wakeMonkey() {
    setMonkeyState(open);
  }

  function playSound() {
    var audio = new Audio(cymbal);
    audio.play();
  }

  useEffect(() => {
    if (count >= 20) {
      disableBanana();
      setMonkeyState(sleeping)
    }
  },[count])

  function Timer(props) {
    return <p id="timer">{props.minutes}:{props.seconds < 10 ? '0' + props.seconds : props.seconds}</p>
  }

  return (
    <>
      <div className="App" style={{flexDirection: 'column', alignItems: 'center'}}>
        <img id="monkey" alt="monkey" src={monkeyState} style={{
          height: '484px',
        }}>
        </img>
        <Timer/>
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
