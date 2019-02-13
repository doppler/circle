import React, { useState, useEffect } from "react";
import "./App.scss";

const App = () => {
  const h = 200;
  const k = 200;
  const r = 200;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [reverse, setReverse] = useState(false);
  const handleXChange = event => setX(Number(event.target.value));
  const handleYChange = event => setY(Number(event.target.value));

  const moveX = () => {
    if (x === 400) setReverse(true);
    if (x === 0) setReverse(false);
    setX(reverse ? x - 1 : x + 1);
  };
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      moveX();
    }, 25);
    return () => clearInterval(timer);
  });
  useEffect(() => {
    setY(h + Math.sqrt((r + x - k) * (r - x + k)));
  }, [x]);

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
            left: `calc(${x}pt - 5pt)`,
            top: `calc(${y}pt - 5pt)`
          }}
        />
      </div>
      <SliderX {...{ x, handleXChange }} /> {x}
      <SliderY {...{ y, handleYChange }} /> {y}
    </div>
  );
};

export default App;

const SliderX = ({ x, handleXChange }) => (
  <input type="range" min={0} max={400} value={x} onChange={handleXChange} />
);

const SliderY = ({ y, handleYChange }) => (
  <input type="range" min={0} max={400} value={y} onChange={handleYChange} />
);
