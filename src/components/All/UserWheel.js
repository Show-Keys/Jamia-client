import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import styled ,{keyframes}from 'styled-components';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';
import jamiaLogo from '../Images/jamia50.png';
import { useSelector } from 'react-redux'; 
import { motion } from 'framer-motion';
// User Wheel

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  background: linear-gradient(135deg, #f4f4f4, #fff1d0);
  text-align: center;
  padding: 20px;
  border-radius: 50px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;


  &::before {
    content: '';
    position: absolute;
    border-radius: 50px;
    width: 145%;
    height: 145%;
    // background: radial-gradient(circle,rgb(253, 255, 255),rgb(79, 196, 225));
    animation: backgroundMove 1s infinite alternate ease-in-out;
    z-index: 0;
  }

  @keyframes backgroundMove {
    0% {
      transform: translate(0%, 0%);
    }
    1% {
      transform: translate(0%, 0%);
    }
  }
`;
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
`;
const LiveBadge = styled.div`
  position: absolute;
  top: -40px;
  right: 180px;
  background-color:rgb(224, 87, 87);
  color: #fff;
  padding: 8px 16px;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 20px;
  text-transform: uppercase;
  animation: ${pulse} 3s infinite;
`;
// Joyous Button with Hover Animation and Confetti Effect
const Button = styled(motion.button)`
  padding: 12px 24px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #32cd32;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;
  box-shadow: 0px 4px 15px rgba(50, 205, 50, 0.5);

  &:hover {
    background-color: #28a745;
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0px 8px 20px rgba(40, 167, 69, 0.7);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: scale(1);
    box-shadow: none;
  }
`;

const WheelContainer = styled.div`
  position: relative;
  margin: 20px 0;
`;

const CenterLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 300px;
  transform: translate(-540%, -180%);
  z-index: 1;
`;

const UserWheel = () => {
  const data = useSelector((state) => state.wheel.data);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // Handle spin
  const handleSpinClick = () => {
    if (data.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'The Wheel is Empty!',
        text: 'Please wait for the admin to add items before spinning the wheel.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#32cd32',
      });
      return;
    }
    const randomPrize = Math.floor(Math.random() * data.length);
    setPrizeNumber(randomPrize);
    setMustSpin(true);
  };

  // Handle stop spinning
  const handleStopSpinning = () => {
      setMustSpin(false);
      launchCustomConfetti();
    
      Swal.fire({
        icon: 'success',
        title: '🎉 Congratulations! 🎉',
        html: `
        <div style="  
          position: relative;
          width: 150px;
          height: 180px;
          margin: 0 auto; /* Center the container */
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
        ">
          <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGp2ZmJmbml5NWJjZDR6aDY3ZnZsZXR6bzlteGR3YjdqYmEyNzY0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ExpUaMtQjl0RVlSwn8/giphy.gif" 
            alt="Money" 
            style="position: absolute; width: 300px; transform: rotate(0deg) translateY(0px);" />
        </div>
        <strong>Winner is:</strong> <br>
        <h2 style="color: #ff8c00; margin-top: 10px;">${data[prizeNumber].option}</h2>
      `,
        timer: 5000,
        timerProgressBar: true,
        confirmButtonText: 'Exit',
        confirmButtonColor: '#ff8c00',
      });
    };

  // Launch custom confetti
  const launchCustomConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 10,
        angle: 90,
        spread: 180,
        origin: { y: 0.6 },
        ticks: 200,
        scalar: 1.5,
        startVelocity: 30,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <Container 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, ease: 'easeOut' }}>

      
      <WheelContainer>
      <LiveBadge>🔴 Live</LiveBadge>
      <h1>User Wheel</h1>
        <CenterLogo src={jamiaLogo} alt="Center Logo" />
        {data.length > 0 ? (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={handleStopSpinning}
            backgroundColors={['#FF0000', '#FFD700', '#32CD32', '#FF69B4', '#FF8C00', '#87CEEB']}
            textColors={['#FFFFFF']}
            outerBorderColor="#FFD700"
            outerBorderWidth={8}
            radiusLineColor="#FFFFFF"
            radiusLineWidth={2}
            fontSize={18}
          />
        ) : (
          <p style={{ color: 'red', fontSize: '2.2rem', marginTop: '20px' }}>
            The wheel is empty. Please wait for the admin to add items.
          </p>
        )}
      </WheelContainer>
      <Button whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}onClick={handleSpinClick} disabled={data.length === 0}>
        {data.length > 0 ? 'Spin the Wheel' : 'No Items to Spin'}
      </Button>
    </Container>
  );
};

export default UserWheel;
