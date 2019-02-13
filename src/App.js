import React, { useState } from "react";
import "./App.scss";

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const handleXChange = event => setX(Number(event.target.value));
  const handleYChange = event => setY(Number(event.target.value));
  return (
    <div className="App">
      <div className="circle-container">
        <div className="inner-box" />
        <div className="inner-box" />
        <div className="inner-box" />
        <div className="inner-box" />
        <div
          className="dot"
          style={{
            left: `calc(50% - 5pt + ${x}pt)`,
            top: `calc(50% - 5pt + ${y}pt)`
          }}
        />
      </div>
      <SliderX {...{ x, handleXChange }} />
      <SliderY {...{ y, handleYChange }} />
    </div>
  );
};

export default App;

const SliderX = ({ x, handleXChange }) => (
  <input type="range" min={-200} max={200} value={x} onChange={handleXChange} />
);

const SliderY = ({ y, handleYChange }) => (
  <input type="range" min={-200} max={200} value={y} onChange={handleYChange} />
);
