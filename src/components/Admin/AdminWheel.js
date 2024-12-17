// src/Components/WheelComponent.js

import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import styled from 'styled-components';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';
import jamiaLogo from '../Images/jamia50.png';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../../Features/WheelSlice';

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
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [newItem, setNewItem] = useState('');


// Handle spin
const handleSpinClick = () => {
    if (data.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'The Wheel is Empty!',
        text: 'Please add some items before spinning the wheel.',
        confirmButtonText: 'Add Items Now',
        confirmButtonColor: '#ff8c00',
      });
      return;
    }
    const randomPrize = Math.floor(Math.random() * data.length);
    setPrizeNumber(randomPrize);
    setMustSpin(true);
  };
  //width: 100%; max-width: 300px
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
  
  
  
  
  
  // Handle add item
  const handleAddItem = () => {
    const trimmedItem = newItem.trim();
  
    // Check for empty input
    if (trimmedItem === '') {
      Swal.fire({
        icon: 'error',
        title: 'Empty Input',
        text: 'Please enter a valid item to add to the wheel.',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#ff8c00',
      });
      return;
    }
  
    // Check for character limit (50 characters)
    if (trimmedItem.length > 10) {
      Swal.fire({
        icon: 'error',
        title: 'Input Too Long',
        text: 'Please enter an item with fewer than 10 characters.',
        confirmButtonText: 'Got It',
        confirmButtonColor: '#ff8c00',
      });
      return;
    }
  
    // Check for duplicate items
    if (data.some((item) => item.option.toLowerCase() === trimmedItem.toLowerCase())) {
      Swal.fire({
        icon: 'warning',
        title: 'Duplicate Item',
        text: `The item "${trimmedItem}" already exists in the wheel.`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff8c00',
      });
      return;
    }
  
    // Add the new item to the wheel
    dispatch(addItem(trimmedItem));
    setNewItem('');
  
    // Focus back on the input field
    document.getElementById('item-input').focus();
  };
  
  

  // Handle delete item
  const handleDeleteItem = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    dispatch(deleteItem(index));
  
    // Check if the wheel is now empty after deletion
    if (updatedData.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Wheel is Empty',
        text: 'All items have been removed. Please add at least one item to spin the wheel.',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#ff8c00',
      });
    }
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
    <Container>
      <h1>Admin Wheel Control</h1>
      <Input
        id="item-input"
        type="text"
        placeholder="Enter new item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      
      <Button onClick={handleAddItem}>Add Item</Button>
      <WheelContainer>
        <CenterLogo src={jamiaLogo} alt="Center Logo" />
        {data.length>0?(
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
        ):(
          <p style={{ color: '#ff8c00', fontSize: '1.2rem', marginTop: '20px' }}>
          The wheel is empty. Please add items to spin.
        </p>
        )}
        
        

      </WheelContainer>
      <Button onClick={handleSpinClick} disabled={data.length === 0}>
        {data.length > 0 ? 'Spin the Wheel' : 'No Items to Spin'}
      </Button>

      <h2>Items in the Wheel</h2>
      <ItemsBox>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {data.map((item, index) => (
            <ListItem key={index}>
              {item.option}
              <Button onClick={() => handleDeleteItem(index)} style={{ padding: '5px 10px' }}>
                Delete
              </Button>
            </ListItem>
          ))}
        </ul>
      </ItemsBox>
    </Container>
  );
};

export default AdminWheel;
