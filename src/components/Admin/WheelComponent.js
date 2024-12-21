// // src/Components/WheelComponent.js

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Swal from 'sweetalert2';
// import { addParticipant } from '../../Features/WheelSlice'; // Import the necessary action
// import { Button, Input, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// const WheelComponent = () => {
//   const dispatch = useDispatch();
//   const participants = useSelector((state) => state.wheel.participants);
//   const [username, setUsername] = useState('');
//   const [accepted, setAccepted] = useState(false); // Tracks whether the user is accepted
//   const [currentPage, setCurrentPage] = useState(1); // Tracks the current page

//   const participantsPerPage = 5;
//   const totalPages = Math.ceil(participants.length / participantsPerPage);

//   // Calculate the participants to display on the current page
//   const currentParticipants = participants.slice(
//     (currentPage - 1) * participantsPerPage,
//     currentPage * participantsPerPage
//   );

//   // Handle adding participant
//   const handleAddParticipant = () => {
//     if (username.trim() === '') {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Username required',
//         text: 'Please enter your username before joining.',
//         confirmButtonText: 'OK',
//       });
//       return;
//     }

//     dispatch(addParticipant({ username, accepted }));
//     setUsername('');
//   };

//   // Handle accepting the user
//   const handleAcceptUser = (username) => {
//     setAccepted(true);
//     dispatch(addParticipant({ username, accepted: true }));
//     Swal.fire({
//       icon: 'success',
//       title: `${username} has been accepted!`,
//       confirmButtonText: 'Great!',
//     });
//   };

//   // Handle rejecting the user
//   const handleRejectUser = (username) => {
//     setAccepted(false);
//     Swal.fire({
//       icon: 'error',
//       title: `${username} has been rejected.`,
//       confirmButtonText: 'OK',
//     });
//   };

//   // Handle pagination
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Wheel Participants</h1>
//       <Input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Enter your username"
//         className="mb-3"
//       />
//       <Button color="warning" onClick={handleAddParticipant}>
//         Join Wheel
//       </Button>

//       <Table striped className="mt-4">
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentParticipants.map((participant, index) => (
//             <tr key={index}>
//               <td>{participant}</td>
//               <td>{accepted ? 'Accepted' : 'Pending'}</td>
//               <td>
//                 <Button color="success" onClick={() => handleAcceptUser(participant)} className="mr-2">
//                   Accept
//                 </Button>
//                 <Button color="danger" onClick={() => handleRejectUser(participant)}>
//                   Reject
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Pagination aria-label="Page navigation example">
//         <PaginationItem disabled={currentPage === 1}>
//           <PaginationLink previous onClick={handlePrevPage} />
//         </PaginationItem>
//         <PaginationItem disabled={currentPage === totalPages}>
//           <PaginationLink next onClick={handleNextPage} />
//         </PaginationItem>
//       </Pagination>

//       <p>
//         Page {currentPage} of {totalPages}
//       </p>
//     </div>
//   );
// };

// export default WheelComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WheelComponent = () => {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [jcode, setJcode] = useState(''); // Jamiya code for your game
  
  // Fetch participants from the server
  useEffect(() => {
    if (jcode) {
      const fetchParticipants = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/participants/${jcode}`);
          setParticipants(response.data); // Update participants with available ones
        } catch (error) {
          console.error('Error fetching participants:', error);
        }
      };

      fetchParticipants();
    }
  }, [jcode, selectedParticipant]);

  // Spin the wheel and choose a participant
  const spinWheel = () => {
    if (participants.length === 0) {
      alert('No participants left to spin!');
      return;
    }

    setWheelSpinning(true);

    // Simulate the wheel spinning
    const randomIndex = Math.floor(Math.random() * participants.length);
    const selected = participants[randomIndex];
    setSelectedParticipant(selected);

    // Call server to update the participant's turn status
    axios
      .post(`http://localhost:5000/use-turn/${jcode}`, { userId: selected.userId })
      .then(() => {
        setWheelSpinning(false);
      })
      .catch((error) => {
        console.error('Error updating turn:', error);
        setWheelSpinning(false);
      });
  };

  // Add a new participant (for testing purposes)
  const addParticipant = (userId, shares) => {
    axios
      .post(`http://localhost:5000/add-participant/${jcode}`, { userId, shares })
      .then(() => {
        alert('Participant added!');
      })
      .catch((error) => {
        console.error('Error adding participant:', error);
      });
  };

  return (
    <div className="App">
      <h1>Spin the Wheel</h1>
      <input
        type="text"
        placeholder="Enter Jamiya Code"
        value={jcode}
        onChange={(e) => setJcode(e.target.value)}
      />
      <button onClick={spinWheel} disabled={wheelSpinning}>
        {wheelSpinning ? 'Spinning...' : 'Spin Wheel'}
      </button>
      {selectedParticipant && (
        <div>
          <h2>Selected Participant: {selectedParticipant.userId}</h2>
        </div>
      )}
      <h3>Participants</h3>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant.userId}</li>
        ))}
      </ul>
      {/* Add participant for testing */}
      <button onClick={() => addParticipant('userId123', 1)}>Add Participant</button>
    </div>
  );
};

export default WheelComponent;
