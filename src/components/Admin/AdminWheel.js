// src/Components/WheelComponent.js

import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import styled from 'styled-components';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';
import jamiaLogo from '../Images/jamia50.png';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWheelItems, addWheelItem, deleteWheelItem } from '../../Features/WheelSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  text-align: center;
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #ff8c00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e07b00;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  margin: 10px;
  width: 200px;
  border: 2px solid #ff8c00;
  border-radius: 5px;
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

const ItemsBox = styled.div`
  width: 300px;
  height: 200px;
  border: 2px solid #ff8c00;
  border-radius: 5px;
  margin-top: 20px;
  padding: 10px;
  overflow-y: auto;
  background-color: #fff;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const AdminWheel = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.wheel.data);
  const isLoading = useSelector((state) => state.wheel.isLoading);
  const error = useSelector((state) => state.wheel.error);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    dispatch(fetchWheelItems());
  }, [dispatch]);

  const handleSpinClick = () => {
    if (data.length === 0) {
      Swal.fire('Warning', 'Please add items before spinning.', 'warning');
      return;
    }
    const randomPrize = Math.floor(Math.random() * data.length);
    setPrizeNumber(randomPrize);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    launchCustomConfetti();

    Swal.fire('Congratulations!', `Winner is: ${data[prizeNumber].option}`, 'success');
  };

  const launchCustomConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 10,
        angle: 90,
        spread: 180,
        origin: { y: 0.6 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const handleAddItem = () => {
    if (newItem.trim() === '') {
      Swal.fire('Error', 'Please enter a valid item.', 'error');
      return;
    }
    dispatch(addWheelItem(newItem));
    setNewItem('');
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteWheelItem(id));
  };

  return (
    <Container>
      <h1>Admin Wheel Control</h1>
      <Input
        type="text"
        placeholder="Enter new item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <Button onClick={handleAddItem}>Add Item</Button>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <WheelContainer>
        <CenterLogo src={jamiaLogo} alt="Center Logo" />
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleStopSpinning}
        />
      </WheelContainer>

      <Button onClick={handleSpinClick} disabled={data.length === 0}>
        {data.length > 0 ? 'Spin the Wheel' : 'No Items to Spin'}
      </Button>

      <h2>Items in the Wheel</h2>
      <ItemsBox>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {data.map((item) => (
            <ListItem key={item._id}>
              {item.option}
              <Button onClick={() => handleDeleteItem(item._id)}>Delete</Button>
            </ListItem>
          ))}
        </ul>
      </ItemsBox>
    </Container>
  );
};

export default AdminWheel;
