import React, { useState, useEffect } from "react";
import "./App.scss";
const width = document.getElementsByTagName("body")[0].clientWidth;

const App = () => {
  const h = width / 2 + 5;
  const k = width / 2 + 5;
  const r = width / 2;
  const [coords, setCoords] = useState({ x: 0, y: 200 });
  const [angle, setAngle] = useState(270);

  const handleAngleSliderChange = event => {
    setAngle(Number(event.target.value));
  };

  const changeAngle = () => {
    setAngle(angle === 360 ? 0 : angle + 0.5);
  };

  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      changeAngle();
    }, 10);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    let radian = (angle * Math.PI) / 180;
    setCoords({
      x: h + r * Math.cos(radian),
      y: k + r * Math.sin(radian)
    });
  }, [angle]);

  return (
    <div className="App">
      <div
        id="circle-container"
        style={{
          backgroundImage: `linear-gradient(${angle +
            90}deg, black, hsl(${angle - 180}, 100%, 50%))`
        }}
      >
        <div
          className="dot"
          style={{
            left: `calc(${coords.x}px - 5px)`,
            top: `calc(${coords.y}px - 5px)`,
            backgroundColor: `hsl(${angle}, 100%, 50%)`
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
