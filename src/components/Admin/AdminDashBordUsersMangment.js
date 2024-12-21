import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticipants } from "../../Features/jamiyaSlice"; // Adjust import based on your file structure
import { Table, Button } from "reactstrap";
import { useParams } from "react-router-dom"; // Import useParams


const AdminDashBordUsersMangment = () => {
const { jcode } = useParams(); // Get jcode from the URL
  const dispatch = useDispatch();

  // Accessing the state from Redux store
  const  participants  = useSelector((state) => state.jamiyas.Participants);

  // Fetch participants when component mounts
  useEffect(() => {
    if (jcode) {
      dispatch(fetchParticipants(jcode));
      console.log(participants);
    }
  }, [dispatch, jcode]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

  return (
    <div>
      <h3>Participants for Jamiya Code: {jcode}</h3>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Shares</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants && participants.length > 0 ? (
            participants.map((participant, index) => (
              <tr key={participant._id}>
                <td>{index + 1}</td>
                <td>{participant.shares}</td>
                <td>{participant.status}</td>
                <td>
                  <Button color="info" onClick={() => handleEdit(participant)}>
                    Edit
                  </Button>{" "}
                  <Button color="danger" onClick={() => handleDelete(participant)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No participants found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

const handleEdit = (participant) => {
  console.log("Editing participant", participant);
  // Handle the edit action (e.g., open a modal or navigate to an edit page)
};

const handleDelete = (participant) => {
  console.log("Deleting participant", participant);
  // Handle the delete action (e.g., dispatch delete action to Redux)
};

export default AdminDashBordUsersMangment;
