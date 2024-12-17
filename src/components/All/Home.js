import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import logo from "../Images/logo.png";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background: linear-gradient(135deg, #e4b363, #f6d365);
  text-align: center;
  padding: 20px;
  color: #fff;
`;

const Logo = styled(motion.img)`
  width: 250px;
  margin-bottom: 20px;
`;

const WelcomeMessage = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const JoinButton = styled(motion.button)`
  position: relative;
  background-color: #ff8c00;
  color: #fff;
  padding: 12px 24px;
  font-size: 1.8rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgb(42, 139, 177);
    transform: scale(1.1);
  }

  &:after {
    content: "v";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 500px;
    background: rgba(242, 106, 8, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease;
    pointer-events: none;
  }

  &:hover:after {
    transform: translate(-50%, -50%) scale(5);
  }
`;

const Home = () => {
  const handleJoinClick = () => {
    Swal.fire({
      title: "Ready to Join?",
      text: "Click to proceed to the Jamia search page!",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Join Now!",
      cancelButtonText: "Maybe Later",
      confirmButtonColor: "#ff8c00",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/search";
      }
    });
  };

  return (
    <>
      <HomeContainer>
        <Logo
          src={logo}
          alt="Logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ rotate: 360 }}
        />
        <WelcomeMessage
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          Welcome to the Jamia Management System
        </WelcomeMessage>
        <JoinButton
          whileHover={{
            scale: 1.1,
            rotate: [0, 5, -5, 0],
            transition: {
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleJoinClick}
        >
          Join Jamia Now!
        </JoinButton>
      </HomeContainer>
    </>
  );
};

export default Home;
