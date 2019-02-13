import React, { useState, useEffect } from "react";
import "./App.scss";

const App = () => {
  const h = 200;
  const k = 200;
  const r = 200;
  const [coords, setCoords] = useState({ x: 0, y: 200 });
  const [angle, setAngle] = useState(270);

  const handleAngleSliderChange = event => {
    setAngle(Number(event.target.value));
  };

  useEffect(() => {
    let radian = (angle * Math.PI) / 180;
    setCoords({
      x: h + r * Math.cos(radian),
      y: k + r * Math.sin(radian)
    });
  }, [angle]);

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
            left: `calc(${coords.x}pt - 5pt)`,
            top: `calc(${coords.y}pt - 5pt)`
          }}
        />
      </div>
      <Slider {...{ angle, handleAngleSliderChange }} />
      <dl>
        <dt>Angle</dt>
        <dd>{angle}</dd>
        <dt>X</dt>
        <dd>{coords.x}</dd>
        <dt>Y</dt>
        <dd>{coords.y}</dd>
      </dl>
    </div>
  );
};

export default App;

const Slider = ({ angle, handleAngleSliderChange }) => (
  <input
    type="range"
    value={angle}
    min={0}
    max={359}
    onChange={handleAngleSliderChange}
  />
);
