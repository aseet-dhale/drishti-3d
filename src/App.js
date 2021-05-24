import React, { useState } from 'react';
import CompModel from './components/CompModel';
import ErrorBoundary from './components/ErrorBoundary';
import { isMobile } from 'react-device-detect';
import { Howl, Howler } from 'howler';
import bg from './assets/bg/bg.webm';
import './App.css';

const sound = new Howl({
  src: bg,
  html5: true,
  loop: true,
});

Howler.volume(0.05);

const Room_1 = "Room_1";
const Room_2 = "Room_2";
const Room_3 = "Room_3";
const Room_4 = "Room_4";

const playSound = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm13.008 2.093c.742.743 1.2 1.77 1.198 2.903-.002 1.133-.462 2.158-1.205 2.9l1.219 1.223c1.057-1.053 1.712-2.511 1.715-4.121.002-1.611-.648-3.068-1.702-4.125l-1.225 1.22zm2.142-2.135c1.288 1.292 2.082 3.073 2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254c1.612-1.608 2.613-3.834 2.616-6.291.005-2.457-.986-4.681-2.595-6.293l-1.254 1.25z" /></svg>);
const pauseSound = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm17.324 4.993l1.646-1.659-1.324-1.324-1.651 1.67-1.665-1.648-1.316 1.318 1.67 1.657-1.65 1.669 1.318 1.317 1.658-1.672 1.666 1.653 1.324-1.325-1.676-1.656z" /></svg>);

function App() {
  const [model, selectModel] = useState(Room_1);
  const [soundState, setSoundState] = useState(false);
  const closeLanding = () => {
    const close = document.getElementById("landing-main");
    const open = document.getElementById("landing-toggle");
    close.style.display = "none";
    open.style.display = "block";
  }
  const openLanding = () => {
    const close = document.getElementById("landing-main");
    const open = document.getElementById("landing-toggle");
    close.style.display = "flex";
    open.style.display = "none";
  }

  const soundPlayback = () => {
    if (!soundState) {
      sound.play();
    } else {
      sound.pause();
    }
    setSoundState(!soundState);
  }

  return (
    <>
      <div id="landing-main">
        <div id="landing-head">
          <div id="landing-head-drishti">drishti</div>
          <div id="landing-head-exhb">EXHIBTION 2021</div>
        </div>
        <div id="landing-button">
          <button onClick={() => { selectModel(Room_1); closeLanding(); }} >Room 1</button>
          <button onClick={() => { selectModel(Room_2); closeLanding(); }} >Room 2</button>
          <button onClick={() => { selectModel(Room_3); closeLanding(); }} >Room 3</button>
          <button onClick={() => { selectModel(Room_4); closeLanding(); }} >Room 4</button>
        </div>
        <div id="landing-instructions">
          {isMobile ? (<div>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M18 24h-12c-1.104 0-2-.896-2-2v-20c0-1.104.896-2 2-2h12c1.104 0 2 .896 2 2v20c0 1.104-.896 2-2 2zm1-5.083h-14v3.083c0 .552.449 1 1 1h12c.552 0 1-.448 1-1v-3.083zm-7 3c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm7-17h-14v13h14v-13zm-1-3.917h-12c-.551 0-1 .449-1 1v1.917h14v-1.917c0-.551-.448-1-1-1zm-4.5 1.917h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3c.276 0 .5.224.5.5s-.224.5-.5.5z" /></svg>
            <p>
              One finger for rotation <br /> Two fingers for To and Fro Motion
            </p>
          </div>) : (
            <div>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M5 22h4v-3h-9v-18h24v18h-10v3h4v1h-13v-1zm5-3v3h3v-3h-3zm13-17h-22v16h22v-16z" /></svg>
              <p>W(Forward), A(Left), S(Backward), D(Right)<br />E(Up), Q(Down) and Mouse/Touchpad to Rotate</p>
            </div>
          )}
        </div>
      </div>
      <div id="landing-toggle" onClick={openLanding}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" /></svg>
      </div>
      <div id="parent-container">
        <div className="child-container-helper">
          <div className="grand-child-helper">
            <span className="helper-icons">ESC</span>
            <span className="helper-text-small">Press ESC to Exit</span>
          </div>
          <div className="grand-child-helper">
            <span className="helper-icons">R</span>
            <span className="helper-text-small">Press R to Reset Camera</span>
          </div>
        </div>
        <div className="child-container-movement">
          <div className="grand-child-movement">
            <span className="movement-text-small">Movement Controls</span>
          </div>
          <div className="grand-child-movement">
            <span className="movement-keys">Q</span>
            <span className="movement-keys">W</span>
            <span className="movement-keys">E</span>
          </div>
          <div className="grand-child-movement">
            <span className="movement-keys">A</span>
            <span className="movement-keys">S</span>
            <span className="movement-keys">D</span>
          </div>
        </div>
      </div>
      <div id="music-controls" onClick={() => { soundPlayback(!soundState); }}>
        <button>{soundState ? "Pause Sound" : "Play Sound"}{soundState ? pauseSound : playSound}</button>
      </div>
      {isMobile ? (
        <div id="mobile-controls">
          <div>
            <button id="but_up">
              <svg transform="rotate(-90) scale(0.65)" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" /></svg>
            </button>
          </div>
          <div>
            <button id="but_do">
              <svg transform="rotate(90) scale(0.65)" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" /></svg>
            </button>
          </div>
          <div>
            <button id="mob-cam-reset">
              <span>R</span>
            </button>
          </div>
        </div>
      ) : null}
      <div id="comp-model">
        <ErrorBoundary>
          <CompModel model={model} />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
