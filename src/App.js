import React, { useState, useEffect } from "react";
import "./App.scss";
const width = document.getElementsByTagName("body")[0].offsetWidth;

const App = () => {
  const [angle, setAngle] = useState(270);
  const [coords, setCoords] = useState({});
  const [params, setParams] = useState({
    h: width / 2,
    k: width / 2,
    r: width / 2
  });

  const handleAngleSliderChange = event => {
    setAngle(Number(event.target.value));
  };

  const resetParams = () => {
    const width = document.getElementById("circle-container").offsetWidth;
    setParams({
      h: width / 2,
      k: width / 2,
      r: width / 2 - 5
    });
  };

  useEffect(() => {
    resetParams();
    window.addEventListener("resize", resetParams);
    return () => window.removeEventListener("resize", resetParams);
  }, []);

  const changeAngle = () => {
    setAngle(angle === 360 ? 0 : angle + 0.25);
  };

  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      changeAngle();
    }, 41.6);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    let radian = (angle * Math.PI) / 180;
    setCoords({
      x: params.h + params.r * Math.cos(radian),
      y: params.k + params.r * Math.sin(radian)
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
        <p
          style={{
            transform: `rotate(${360 - angle}deg)`,
            color: `hsl(${angle - 120}, 100%, 50%)`
          }}
        >
          Hello
        </p>
        <p
          style={{
            transform: `rotate(${angle}deg)`,
            color: `hsl(${angle + 120}, 100%, 50%)`
          }}
        >
          World
        </p>
        <div
          className="dot"
          style={{
            left: `calc(${coords.x}px - 5px)`,
            top: `calc(${coords.y}px - 5px)`,
            backgroundColor: `hsl(${angle}, 100%, 50%)`,
            transform: `rotate(${angle}deg)`
          }}
        />
      </div>
      <Slider {...{ angle, handleAngleSliderChange }} />
      <dl>
        <dt>state</dt>
        <dd>{JSON.stringify({ angle, coords, params }, null, 2)}</dd>
      </dl>
      <ViewSourceLink />
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

const ViewSourceLink = () => (
  <a
    href="https://github.com/doppler/circle/blob/master/src/App.js"
    rel="noopener noreferrer"
    target="_blank"
  >
    View Source
  </a>
);
