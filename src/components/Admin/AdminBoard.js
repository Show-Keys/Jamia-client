import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button as MaterialButton } from '@material-ui/core';

// Styled Components
const DashboardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 20vh;
  width: 90%;
  max-width: 720px;
  background: linear-gradient(135deg, rgb(42, 139, 177), rgb(198, 134, 45), rgb(117, 103, 84));
  text-align: center;
  padding: 30px;
  color: #fff;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  margin: 50px auto;
  backdrop-filter: blur(50px);
  overflow: hidden;
`;


const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
`;

const ButtonBox = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const Button = styled(motion.button)`
  padding: 20px 40px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #ff8c00;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(29, 147, 177);
  }
`;

const AdminBoard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login'); // Redirect to login page if not admin
    }
  }, [isAdmin, navigate]);

  return (
    <DashboardContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 10, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Admin Dashboard
      </Title>
      <ButtonBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/AdminWheel')}
        >
          Manage Wheel
        </Button>
        <MaterialButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/UserManagement')}
        >
          User Management
        </MaterialButton>
        <MaterialButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/JamiaDashBoard')}
        >
          Jamia Dashboard
        </MaterialButton>
      </ButtonBox>
    </DashboardContainer>
  );
};

export default AdminBoard;
