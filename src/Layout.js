import React, { useRef, useEffect, useState } from "react";
import paper from "paper";
import "./styles.css";
import SimplexNoise from "simplex-noise";

import { useSpring, useSprings, useChain, animated } from "react-spring";
import styled from "styled-components";
import { menuList, cars_data, menu_items } from "./data";


import img1 from './img/Ice1.jpg'
import Menu from "./Sidebar";
import FlockMesh from './FlockMesh'
const menuItemHeight = 60;
const MenuItem = styled(animated.div)`
  box-sizing: border-box;
  cursor: pointer;

  padding: "2rem";
  fontsize: "30px";

  transition: color 0.2s;
  :hover {
    color: blue;
  }
  :last-child {
    border-bottom: none;
  }
`;
MenuItem.defaultProps = {
  bg: "#fff",
};

export default function Layout() {
  const mouse = useRef(null);
  const canvas = useRef(null);

  let lastX = 1000;
  let lastY = 1000;
  let clientX = 1000;
  let clientY = 1000;
  const [stuck, setStuck] = useState(false);
  const [[stuckX, stuckY], setStuckCoords] = useState([-100, -100]);
  const [fullMenuVisible, setFullMenuVisible] = useState(false);
  const [carIndex, setCarIndex] = useState(0);
  const [carData, setCarData] = useState(null);

  const magnetIn = (e) => {
    setStuck(true);
    const navItem = e.currentTarget;
    const navItemBox = navItem.getBoundingClientRect();
    setStuckCoords([
      Math.round(navItemBox.left + navItemBox.width / 2),
      Math.round(navItemBox.top + navItemBox.height / 2),
    ]);
    //stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
    //stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
    //console.log(navItem)
  };

  const magnetOut = () => {
    setStuck(false);
  };

  const handleMouseMove = (e) => {
    clientX = e.clientX;
    clientY = e.clientY;
    mouse.current.style.left = `${clientX - 2.5}px`;
    mouse.current.style.top = `${clientY - 2.5}px`;
    // console.log(stuck);
  };

  const initCanvas = () => {
    paper.setup(canvas.current);
    const polygon = new paper.Path.RegularPolygon(new paper.Point(0, 0), 8, 15);
    polygon.strokeColor = "#266981";
    polygon.strokeWidth = 1;

    // polygon.smooth();
    const shapeBounds = {
      width: 75,
      height: 75,
    };

    const noiseScale = 150; // speed
    const noiseRange = 4; // range of distortion
    let isNoisy = false; // state

    const noiseObjects = polygon.segments.map(() => new SimplexNoise());
    let bigCoordinates = [];

    let group = new paper.Group([polygon]);
    group.applyMatrix = false;

    const lerp = (a, b, n) => {
      return (1 - n) * a + n * b;
    };

    const map = (value, in_min, in_max, out_min, out_max) => {
      return (
        ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    };

    // if (clientX <= 70 && clientY <= 70) {
    //   isStuck = true;
    // } else {
    //   isStuck = false;
    // }

    paper.view.onFrame = (event) => {
      if (!stuck) {
        // move circle around normally
        lastX = lerp(lastX, clientX, 0.2);
        lastY = lerp(lastY, clientY, 0.2);
        group.position = new paper.Point(lastX, lastY);
      } else if (stuck) {
        lastX = lerp(lastX, stuckX, 0.2);
        lastY = lerp(lastY, stuckY, 0.2);
        group.position = new paper.Point(lastX, lastY);
      }

      if (stuck && polygon.bounds.width < shapeBounds.width) {
        // scale up the shape
        polygon.scale(1.08);
      } else if (!stuck && polygon.bounds.width > 30) {
        // remove noise
        if (isNoisy) {
          polygon.segments.forEach((segment, i) => {
            segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
          });
          isNoisy = false;
          bigCoordinates = [];
        }
        // scale down the shape
        const scaleDown = 0.92;
        polygon.scale(scaleDown);
      }
      /*  else {
        // console.log(lastX);
        lastX = lerp(lastX, 30, 0.3);
        lastY = lerp(lastY, 30, 0.3);
        group.position = new paper.Point(lastX, lastY);
      } */

      if (stuck && polygon.bounds.width >= shapeBounds.width) {
        isNoisy = true;
        // first get coordinates of large circle
        if (bigCoordinates.length === 0) {
          polygon.segments.forEach((segment, i) => {
            bigCoordinates[i] = [segment.point.x, segment.point.y];
          });
        }

        // loop over all points of the polygon
        polygon.segments.forEach((segment, i) => {
          // get new noise value
          // we divide event.count by noiseScale to get a very smooth value
          const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
          const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);

          // map the noise value to our defined range
          const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
          const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);

          // apply distortion to coordinates
          const newX = bigCoordinates[i][0] + distortionX;
          const newY = bigCoordinates[i][1] + distortionY;

          // set new (noisy) coodrindate of point
          segment.point.set(newX, newY);
        });
      }
      polygon.smooth();
    };
  };

  useEffect(() => {
    mouse.current.style.left = "-100px";
    mouse.current.style.top = "-100px";

    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    initCanvas();
  });

  const [rightMenuVisible, setRightMenuVisible] = useState(false);

  useEffect(() => {
    setCarData(cars_data[carIndex]);
  }, [carIndex]);

  const [open, set] = useState(true);
  const rightMenuAnimation = useSpring({
    /*  width: rightMenuVisible ? "100%" : "0%", */
    opacity: rightMenuVisible ? 1 : 0,
    transform: rightMenuVisible ? `translateX(0)` : `translateX(100%)`,
  });

  const springsRef = React.useRef();
  const delayValue = 100;
  const springs = useSprings(
    menuList.length,
    menuList.map((item, i) => ({
      ref: springsRef,
      item,
      delay: rightMenuVisible
        ? i * delayValue
        : menuList.length * delayValue - i * delayValue,
      opacity: rightMenuVisible ? 1 : 0,
      x: rightMenuVisible ? "0%" : "20%",
      from: {
        opacity: 0,
        x: "20%",
      },
    }))
  );

  const mainRef = React.useRef();

  const mainsprings = useSprings(
    carData ? carData.length : 3,
    carData
      ? carData.map((item, i) => ({
          ref: mainRef,
          item,
          delay: rightMenuVisible
            ? i * delayValue
            : cars_data[0].length * delayValue - i * delayValue,
          opacity: rightMenuVisible ? 0 : 1,
          y: rightMenuVisible ? "20%" : "0%",
          from: {
            opacity: 1,
            y: "0%",
          },
        }))
      : cars_data[0].map((item, i) => ({
          ref: mainRef,
          item,
          delay: rightMenuVisible
            ? cars_data[0].length * delayValue - i * delayValue
            : i * delayValue,
          opacity: rightMenuVisible ? 0 : 1,
          y: rightMenuVisible ? "20%" : "0%",
          from: {
            opacity: 1,
            y: "0%",
          },
        }))
  );

  const fullsprings = useSprings(
    menu_items.length,
    menu_items.map((item, i) => ({
      item,
      delay: fullMenuVisible
        ? i * delayValue
        : menu_items.length * delayValue - i * delayValue,
      opacity: fullMenuVisible ? 1 : 0,
      y: fullMenuVisible ? "0%" : "20%",
      from: {
        opacity: 0,
        y: "20%",
      },
    }))
  );

  const fullMenuAnimation = useSpring({
    transform: fullMenuVisible ? `translateY(0)` : `translateY(-100%)`,
    opacity: fullMenuVisible ? 1 : 0,
  });

  React.useEffect(() => {
    console.log(rightMenuVisible);
    setRightMenuVisible(false);
  }, []);

  const springRef = React.useRef();
  const { background, iconTransform, ...springProps } = useSpring({
    ref: springRef,

    iconTransform: open ? "rotate(0deg)" : "rotate(-45deg)",
    height: rightMenuVisible ? `${menuItemHeight * menuList.length}px` : "0px",
    from: {
      iconTransform: "rotate(-45deg)",
      height: "0px",
    },
  });

  useChain(
    rightMenuVisible ? [springsRef, mainRef] : [springsRef, mainRef],
    rightMenuVisible ? [0.75, 0] : [0.25, 0.25]
  );

  return (
    <main>
      <div className="frame">
        <div className="frame__title-wrap"></div>
        <div className="frame__links"></div>
        <div className="frame__demos">
          <a
            href="https://isengupt.github.io/glass-blur/"
            activeClassName="frame__demo--current"
            className="frame__demo"
            onMouseEnter={magnetIn}
            onMouseLeave={magnetOut}
          >
            <svg
              style={{ fill: fullMenuVisible ? "black" : "#fff" }}
              className="menu__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"
              ></path>
            </svg>
          </a>
          <a
            href="https://github.com/isengupt/car-prods"
            activeClassName="frame__demo--current"
            className="frame__demo"
            onMouseEnter={magnetIn}
            onMouseLeave={magnetOut}
          >
            <svg
              style={{ fill: fullMenuVisible ? "black" : "#fff" }}
              className="menu__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            activeClassName="frame__demo--current"
            className="frame__demo"
            onMouseEnter={magnetIn}
            onMouseLeave={magnetOut}
            onClick={() => setFullMenuVisible(!fullMenuVisible)}
          >
            <svg
              style={{
                transform: fullMenuVisible ? "rotate(45deg)" : "rotate(0deg)",
                fill: fullMenuVisible ? "black" : "#fff",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill-rule="evenodd"
                d="M11.75 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.5v5.75a.75.75 0 01-1.5 0V12.5H5.25a.75.75 0 010-1.5H11V5.25a.75.75 0 01.75-.75z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div onMouseMove={handleMouseMove} className="container">
        <div ref={mouse} className="cursor cursor--small" />
        <canvas ref={canvas} className="cursor cursor--canvas" />
          <FlockMesh/>
 
        <div
          className="main-content"
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <div className="main-navbar">
            <div className="frame__title-wrap">
              <h1 className="frame__title">Ishan Sengupta</h1>
              <p className="frame__tagline">Front-end experimentation</p>
            </div>

            <div className="collections__item">
              <span> </span>
            </div>
          </div>
          <div className="main-info">
            {[mainsprings[0]].map(({ y, ...props }, i) => (
              <animated.div
                key={i}
                style={{
                  paddingBottom: "1rem",
                  fontSize: "62px",
                  fontWeight: "bolder",
                  letterSpacing: "1.25px",
                  maxWidth: "75%",
                  lineHeight: "1.1",
                  transform: y.interpolate((y) => `translateY(${y})`),
                  ...props,
                }}
              >
                {props.item
                  ? props.item
                  : "Iceberg Tours through the coldest lands"}
              </animated.div>
            ))}
            {[mainsprings[1]].map(({ y, ...props }, i) => (
              <animated.div
                key={i}
                style={{
                  paddingBottom: "1rem",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontStyle: "italic",

                  opacity: "0.5",

                  transform: y.interpolate((y) => `translateY(${y})`),
                  ...props,
                }}
              >
                {props.item ? props.item : "The Primary Tour"}
              </animated.div>
            ))}
            {[mainsprings[2]].map(({ y, ...props }, i) => (
              <animated.div
                key={i}
                style={{
                  paddingBottom: "1rem",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: "bold",
                  maxWidth: "75%",
                  transform: y.interpolate((y) => `translateY(${y})`),
                  ...props,
                }}
              >
                {props.item
                  ? props.item
                  : "A lot of ice to be seen in all corners. Tours start at $10 and increment up based on preference"}
              </animated.div>
            ))}

            {[mainsprings[2]].map(({ y, ...props }, i) => (
              <animated.div
                key={i}
                style={{
                  paddingBottom: "1rem",
                  letterSpacing: "2",
                  fontSize: "12px",
                  fontWeight: "bolder",
                  textTransform: "uppercase",

                  transform: y.interpolate((y) => `translateY(${y})`),
                  ...props,
                }}
              >
                MORE
              </animated.div>
            ))}
          </div>

          <div className="main-footer">
            <span> </span>
          </div>
          <animated.div
            className="big__menu menu--full"
            style={fullMenuAnimation}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                overflow: "hidden",
                display: "flex",
                marginLeft: "2rem",

                flexDirection: "column",

                justifyContent: "center",
              }}
            >
              {fullsprings.map(({ y, ...props }, i) => (
                <MenuItem
                  key={i}
                  style={{
                    padding: "1rem",
                    fontSize: "32px",

                    transform: y.interpolate((y) => `translateX(${y})`),
                    ...props,
                  }}
                  magnetIn={magnetIn}
                  magnetOut={magnetOut}
                >
                  {props.item}
                </MenuItem>
              ))}
            </div>
            <div className="newsletter__container">
              <div className="newsletter__images">
                  <div style={{backgroundImage: `url(${img1})`, 
                  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  width: '400px', height: '400px'
                   }}></div>
       
              </div>

              <div className="newsletter__footer">
                <input
                  placeholder="NEWSLETTER"
                  className="newsletter__input"
                  type="text"
                  id="lname"
                  name="lname"
                />
              </div>
            </div>
          </animated.div>
          <animated.div className="menu menu--right" style={rightMenuAnimation}>
            <div className="menu--image">
           <div className="menu--background" ></div>
            </div>
            <div
              style={{
                height: "100vh",
                width: "100%",
                overflow: "hidden",
                display: "grid",
                gridTemplateRows: "1fr 50px",
                background: "#fff",
                padding: "2rem",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                {springs.map(({ x, ...props }, i) => (
                  <MenuItem
                    key={i}
                    style={{
                      fontSize: "36px",
                      paddingTop: "2rem",
                      paddingBottom: "2rem",
                      paddingLeft: "1rem",

                      transform: x.interpolate((x) => `translateX(${x})`),
                      ...props,
                    }}
                    magnetIn={magnetIn}
                    magnetOut={magnetOut}
                  >
                    {props.item}
                  </MenuItem>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  paddingBottom: "1rem",
                  letterSpacing: "2",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
      
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div 
                   magnetIn={magnetIn}
            magnetOut={magnetOut}
                style={{ paddingLeft: "1rem", marginRight: "2rem" }}>
                  Hello
                </div>
                <div style={{ marginRight: "2rem" }}>Goodbye</div>
              </div>
            </div>
          </animated.div>
        </div>

        <div className="sidebar">
          <Menu
            magnetIn={magnetIn}
            magnetOut={magnetOut}
            setRightMenuVisible={setRightMenuVisible}
            rightMenuVisible={rightMenuVisible}
            setCarIndex={setCarIndex}
          />
        </div>
      </div>
    </main>
  );
}
