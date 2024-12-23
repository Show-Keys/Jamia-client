import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Spinner,
} from "reactstrap";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getJamiyas } from "../../Features/jamiyaSlice";
import { useNavigate } from "react-router-dom";

const SearchJamiya = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jamiyas, loading, error, message } = useSelector((state) => state.jamiya || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState(null);

  useEffect(() => {
    dispatch(getJamiyas());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(getJamiyas(searchTerm));
  };

  const handleCardClick = (jamiyaId) => {
    navigate(`/jamiya/${jamiyaId}`);
  };

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <Container>
      <Typography variant="h4" className="my-4">Search Jamiya</Typography>
      <Row className="mb-4">
        <Col md={8}>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter Jamiya name"
          />
        </Col>
        <Col md={4}>
          <Button color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>
      {loading && <Spinner />}
      {error && <Typography color="error">{error.message || error}</Typography>}
      {message && jamiyas.length === 0 && (
        <Alert color="danger" className="mt-3">
          {message || "No data available at the moment."}
        </Alert>
      )}
      {jamiyas && jamiyas.length > 0 ? (
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
            {jamiyas.map((item, index) => (
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
                  <Button color="success" className="me-2" onClick={() => handleCardClick(item.id)}>
                    Join
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Typography variant="h6">No available Jamiya</Typography>
      )}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Description</ModalHeader>
        <ModalBody>{selectedDescription || "No description available."}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default SearchJamiya;
