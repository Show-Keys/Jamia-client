import React from 'react';
import styled ,{keyframes} from 'styled-components';
import { Link } from 'react-router-dom';
import 'animate.css';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg,rgb(238, 69, 69),rgb(198, 134, 45),rgb(117, 103, 84));
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(0px + 2vmin);
  color: white;
  border-radius: 20px;
  padding: 20px;
  margin: 20px auto;
  width: 90%;
  max-width: 1200px;
  position: relative;
  box-shadow: 0px 10px 10px rgb(230, 101, 101);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 15px 30px rgb(42, 139, 177);
    background: linear-gradient(135deg,rgb(42, 139, 177),rgb(198, 134, 45),rgb(117, 103, 84));
  }
`;

const Nav = styled.nav`
  margin-top: 1rem;
  display: flex;
  gap: 20px;

  a {
    color:rgb(243, 233, 210);
    font-weight: bold;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color:rgb(42, 139, 177);
      transform: translateY(-5px);
      text-decoration: underline;
    }

    &:active {
      transform: translateY(2px);
    }
  }
`;
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  70% {
    transform: scale(1.2);
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
`;
const LiveBadge = styled.div`
  top: -20px;
  right: -15px;
  background-color:rgb(224, 87, 87);
  color: #fff;
  padding: 3px 10px;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 10px;
  text-transform: uppercase;
  animation: ${pulse} 3s infinite;
`;
export { HeaderContainer, Nav };


const Header = () => (
  <HeaderContainer>
    <h1>Jamia</h1>
    <Nav>
      <Link to="/">Home</Link>|
      <Link to="/search">Join To Jamia</Link>|
      <Link to="/AdminBoard">Admin Board</Link>|
      <Link to="/UserWheel"><LiveBadge>🔴 Live Wheel</LiveBadge></Link>
      
    </Nav>
  </HeaderContainer>
);

export default Header;
