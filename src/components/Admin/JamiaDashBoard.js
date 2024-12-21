import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getJamiyas } from "../../Features/jamiyaSlice";
import { useNavigate } from "react-router-dom";

const JamiaDashBorad = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Modal visibility state
  const [selectedDescription, setSelectedDescription] = useState(null); // Modal content
  const navigate = useNavigate();
  const Jamiya = useSelector((state) => state.jamiyas.Jamiyas || []); // Fetched data
  const msg = useSelector((state) => state.jamiyas.message); // Error or response message
  console.log(Jamiya);
  console.log(msg);
  const dispatch = useDispatch();

  // Fetch all Jamiya on page load
  useEffect(() => {
    dispatch(getJamiyas()); // Assuming `getJamiya()` fetches all data when no parameter is passed
  }, [dispatch]);

  // Modal Toggle
  const toggleModal = () => setModalOpen(!isModalOpen);


  const handleOpen = (jcode) => {

    navigate(`/viewusers/${jcode}`);

  }

  return (
    <Container className="view-page">
      <Row className="justify-content-center align-items-center">
        <Col md={10} className="text-center">
          <h1 className="mb-4">All Jamiya</h1>

          {/* Handle "No Data Found" */}
          {msg && Jamiya.length === 0 && (
            <Alert color="danger" className="mt-3">
              {msg || "No data available at the moment."}
            </Alert>
          )}

          {/* Display Table */}
          {Jamiya && Jamiya.length > 0 && (
            <Table bordered responsive striped>
              <thead>
                <tr>
                  <th>Order Code</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Jamiya.map((item, index) => (
                  <tr key={index}>
                    <td>{item.jcode}</td>
                    <td>{new Date(item.startDay).toLocaleDateString()}</td>
                    <td>{new Date(item.endDate).toLocaleDateString()}</td>
                    <td>
                      <span
                        style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => {
                          setSelectedDescription(item.description);
                          toggleModal();
                        }}
                      >
                        View Description
                      </span>
                    </td>
                    <td>
                      <Button color="success" className="me-2" onClick={() => handleOpen(item.jcode)}>
                        Open
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Modal for Description */}
          <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Description</ModalHeader>
            <ModalBody>{selectedDescription || "No description available."}</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default JamiaDashBorad;
