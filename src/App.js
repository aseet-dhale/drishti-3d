import { useState } from 'react';
import './App.css';
import CompModel from './components/CompModel';

const AB_2 = "AB_2";
const AB_3 = "AB_3";
const Test_3 = "Test_3";

function App() {
  const [model, selectModel] = useState(AB_2);
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
  return (
    <>
      <div id="landing-main">
        <div id="landing-head">
          <p>Drishti Exhibition 2021</p>
        </div>
        <div id="landing-button">
          <button onClick={() => { selectModel(AB_2); closeLanding(); }} >AB 1</button>
          <button onClick={() => { selectModel(AB_2); closeLanding(); }} >AB 2</button>
          <button onClick={() => { selectModel(Test_3); closeLanding(); }} >TEST 3</button>
          {/* <button onClick={() => { selectModel(Test_3); closeLanding(); }} >AB 4</button> */}
        </div>
        <div id="landing-instructions">
          <div>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M5 22h4v-3h-9v-18h24v18h-10v3h4v1h-13v-1zm5-3v3h3v-3h-3zm13-17h-22v16h22v-16z" /></svg>
            <p>W,A,S,D and Mouse/Trackball</p>
          </div>
          <div>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M18 24h-12c-1.104 0-2-.896-2-2v-20c0-1.104.896-2 2-2h12c1.104 0 2 .896 2 2v20c0 1.104-.896 2-2 2zm1-5.083h-14v3.083c0 .552.449 1 1 1h12c.552 0 1-.448 1-1v-3.083zm-7 3c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm7-17h-14v13h14v-13zm-1-3.917h-12c-.551 0-1 .449-1 1v1.917h14v-1.917c0-.551-.448-1-1-1zm-4.5 1.917h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3c.276 0 .5.224.5.5s-.224.5-.5.5z" /></svg>
            <p>
              One finger for rotation <br /> Two fingers for To and Fro Motion
            </p>
          </div>
        </div>
      </div>
      <div id="landing-toggle" onClick={openLanding}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
      </div>
      <div id="comp-model">
        <CompModel model={model} />
      </div>
    </>
  );
}

export default App;
