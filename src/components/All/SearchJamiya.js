import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getJamiya } from "../../Features/jamiyaSlice";
import { addParticipant } from "../../Features/jamiyaSlice";

const SearchJamiya = () => {
  const [code, setCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDescription, setSelectedDescription] = useState(null); // For description modal
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false); // For join modal
  const [selectedJamiya, setSelectedJamiya] = useState(null); // For join modal
  const [shares, setShares] = useState(0); // Number of shares
  const [errorMessage, setErrorMessage] = useState(""); // For validation

  const itemsPerPage = 5; // Number of items per page
  const Jamiya = useSelector((state) => state.jamiyas.Jamiyas || []);
  const totalShares = useSelector((state) => state.jamiyas.totalShares || 0);
  const user = useSelector((state) => state.auth.user);


  const msg = useSelector((state) => state.jamiyas.message);
  const isLoading = useSelector((state) => state.jamiyas.isLodaing);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(getJamiya(code));
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(Jamiya)
    ? Jamiya.slice(indexOfFirstItem, indexOfLastItem)
    : [Jamiya];

  const totalPages = Math.ceil(
    (Array.isArray(Jamiya) ? Jamiya.length : 1) / itemsPerPage
  );

  // Description Modal Toggle
  const toggleDescriptionModal = () => setDescriptionModalOpen(!isDescriptionModalOpen);

  // Join Modal Functions
  const openJoinModal = (jamiya) => {
    setSelectedJamiya(jamiya);
    setJoinModalOpen(true);
  };

  const closeJoinModal = () => {
    setJoinModalOpen(false);
    setErrorMessage("");
    setShares(0);
  };

  const handleJoin = () => {
    if (shares <= 0 || shares > Jamiya.totalShares) {
      setErrorMessage(
        `You can only select up to ${Jamiya.totalShares} shares.`
      );
      return;
    }
    // Add your join logic here
    console.log(`Joined Jamiya: ${selectedJamiya.jcode}, Shares: ${shares}`);
    console.log(user);
    const jamiyaData={jcode:Jamiya.jcode,participantName:user._id,shares:shares}
    console.log(jamiyaData);
    dispatch(addParticipant(jamiyaData));
    closeJoinModal();
  };


  return (
    <Container className="search-page">
      <Row className="justify-content-center align-items-center">
        <Col md={8} className="text-center">
          <h1 className="mb-4">Search Page</h1>
          <div className="search-box d-flex mb-4">
            <Input
              type="text"
              placeholder="Search here..."
              className="me-2 search-input"
              onChange={(e) => setCode(e.target.value)}
            />
            <Button color="primary" className="search-button" onClick={handleSubmit}>
              Search
            </Button>
          </div>

          {/* Show Loading Spinner */}
          {isLoading && (
            <div className="loading-container">
              <Spinner style={{ width: "3rem", height: "3rem" }} />
            </div>
          )}

          {/* Display Table */}
          {currentItems && currentItems.length > 0 ? (
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
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.jcode}</td>
                    <td>{new Date(item.startDay).toLocaleDateString()}</td>
                    <td>{new Date(item.endDate).toLocaleDateString()}</td>
                    <td>
                      <span
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedDescription(item.description);
                          toggleDescriptionModal();
                        }}
                      >
                        View Description
                      </span>
                    </td>
                    <td>
                      <Button
                        color="success"
                        className="me-2"
                        onClick={() => openJoinModal(item)}
                      >
                        Join
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="mt-4">{msg || "No results found."}</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i} active={currentPage === i + 1}>
                  <PaginationLink onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </Pagination>
          )}

          {/* Modal for Description */}
          <Modal isOpen={isDescriptionModalOpen} toggle={toggleDescriptionModal}>
            <ModalHeader toggle={toggleDescriptionModal}>Description</ModalHeader>
            <ModalBody>{selectedDescription || "No description available."}</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleDescriptionModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          {/* Modal for Join */}
          <Modal isOpen={isJoinModalOpen} toggle={closeJoinModal}>
            <ModalHeader toggle={closeJoinModal}>Join Jamiya</ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to join the Jamiya:{" "}
                <strong>{selectedJamiya?.jcode}</strong>?
              </p>
              <p>
                Available Shares: <strong>{Jamiya.totalShares}</strong>
              </p>
              <Input
                type="number"
                placeholder="Enter number of shares"
                value={shares}
                onChange={(e) => setShares(Number(e.target.value))}
              />
              {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleJoin}>
                Confirm
              </Button>
              <Button color="secondary" onClick={closeJoinModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchJamiya;
