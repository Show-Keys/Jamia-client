import React from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import styled, { keyframes } from "styled-components";

// Animated gradient background
const moveGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #6a11cb,rgb(37, 252, 248),rgb(255, 203, 31),rgb(234, 91, 91));
  background-size: 400% 400%;
  animation: ${moveGradient} 15s ease infinite;
  z-index: -1;
`;

const AnimatedBackground = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesOptions = {
    particles: {
      number: { value: 100 },
      size: { value: 3 },
      move: { enable: true, speed: 2 },
      opacity: { value: 0.7 },
      links: { enable: true, distance: 150, color: "#ffffff" },
    },
    background: { color: "transparent" },
    fullScreen: { enable: false },
  };

  return (
    <>
      <BackgroundContainer />
      <Particles init={particlesInit} options={particlesOptions} />
    </>
  );
};

export default AnimatedBackground;
