import './App.css';

function Timer() {
  var duration = 100;
  var sec = duration % 60;
  var minute = Math.floor(duration / 60);
  setInterval(() => {
      document.querySelector("#timer").innerHTML=minute+':'+sec;
      sec--;
      if (sec < 0) {
          sec = 60;
          minute--;
      }
      if (minute < 0) {
          clearInterval(Timer);
          // play sounds here
          return true;
      }
  }, 1000);
}



function App() {
  Timer();
  return (
    <div className="App">
      <p id="timer">yipe</p>
      <button type="button" onclick="Timer()">Start</button>
    </div>
  );
}

export default App;
