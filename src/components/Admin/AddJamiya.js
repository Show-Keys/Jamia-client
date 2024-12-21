import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddJamiyaValidation from "../../Validation/AddJamiyaVal"; // Import the validation schema
import {
  Form,
  FormGroup,
  Label,
  Button,
  FormFeedback,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveJamiya } from "../../Features/jamiyaSlice";
import { clearMessage } from "../../Features/jamiyaSlice";
import { toast } from "react-toastify";




const AddJamiya = () => {
  const today = new Date().toISOString().split("T")[0];
  const [code, setCode] = useState("");
  const [noOfMonths, setNoOfMonths] = useState(null);
  const [startDay, setStartDay] = useState(today);
  // const [amountOfShare, setAmountOfShare] = useState("");
  const [description, setDescription] = useState("");
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [modal, setModal] = useState(false); // Modal for existing Jamiya
  const [rulesModal, setRulesModal] = useState(false); // Modal for Rules and Policies
  // const [modalMessage, setModalMessage] = useState(""); // Message for the modal
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.jamiyas.message);

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddJamiyaValidation), // Use the validation schema
  });

  useEffect(() => {
    if (startDay && noOfMonths) {
      const startDate = new Date(startDay);
      startDate.setMonth(startDate.getMonth() + parseInt(noOfMonths, 10));
      setEndDate(startDate.toISOString().split("T")[0]);
    } else {
      setEndDate("");
    }
  }, [startDay, noOfMonths]);

  useEffect(() => {
    if (msg === "Jamiya Exist") {
      // setModalMessage(msg);
      setModal(true);
    }
  }, [msg]);

  const handleCancel = () => {
    dispatch(clearMessage());
    setModal(false);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleRulesModal = () => {
    setRulesModal(!rulesModal); // Toggle Rules and Policies modal
  };

  const handleSubmit = () => {
    const jamiya = {
      code: code,
      nomn: noOfMonths,
      startDay: startDay,
      endDate: endDate,
      description: description,
    };
    dispatch(saveJamiya(jamiya));
    toast.success("Jamiya added successfully!");  
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Form
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
          Add Jamiya
        </h2>

        {/* Form Fields */}
        <Row>
          <Col>
            {/* Code */}
            <FormGroup>
              <Label for="code">Code</Label>
              <input
                type="text"
                className={`form-control ${errors.code ? "is-invalid" : ""}`}
                {...register("code", {
                  value: code,
                  onChange: (e) => setCode(e.target.value),
                })}
              />
              {errors.code && <FormFeedback>{errors.code.message}</FormFeedback>}
            </FormGroup>

          
             {/* Start Day */}
             <FormGroup>
              <Label for="startDay">Start Day</Label>
              <input
                type="date"
                className={`form-control ${errors.startDay ? "is-invalid" : ""}`}
                {...register("startDay", {
                  value: startDay || "",
                  onChange: (e) => setStartDay(e.target.value),
                })}
              />
              {errors.startDay && (
                <FormFeedback>{errors.startDay.message}</FormFeedback>
              )}
            </FormGroup>
            {/* No. of Months */}
            <FormGroup>
              <Label for="noOfMonths">No. of Months</Label>
              <input
                type="number"
                className={`form-control ${
                  errors.noOfMonths ? "is-invalid" : ""
                }`}
                {...register("noOfMonths", {
                  value: noOfMonths,
                  onChange: (e) => setNoOfMonths(e.target.value),
                })}
              />
              {errors.noOfMonths && (
                <FormFeedback>{errors.noOfMonths.message}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col>
           

            {/* End Date */}
            <FormGroup>
              <Label for="endDate">End Date</Label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                readOnly
              />
            </FormGroup>

            {/* Description */}
            <FormGroup>
              <Label for="description">Description</Label>
              <textarea
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                {...register("description", {
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                })}
              />
              {errors.description && (
                <FormFeedback>{errors.description.message}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        {/* Rules and Policies */}
        <Row>
          <FormGroup check>
            <Label check>
              <input
                type="checkbox"
                {...register("rulesAccepted", {
                  value: rulesAccepted,
                  onChange: (e) => setRulesAccepted(e.target.checked),
                })}
              />{" "}
              I agree to the{" "}
              <span
                style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                onClick={toggleRulesModal}
              >
                rules and policies
              </span>
            </Label>
            {errors.rulesAccepted && (
              <div className="text-danger">{errors.rulesAccepted.message}</div>
            )}
          </FormGroup>
        </Row>

        {/* Submit Button */}
        <Row>
          <FormGroup className="text-center mt-4">
          {msg && <div className="alert alert-danger">{msg}</div>}
            <Button color="primary" onClick={submitForm(handleSubmit)}>
              Add Jamiya
            </Button>
          </FormGroup>
        </Row>
      </Form>

      {/* Modal for Existing Jamiya */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Error</ModalHeader>
        <ModalBody>This Jamiya Exists. Could You Change the Code?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal for Rules and Policies */}
      <Modal
  isOpen={rulesModal}
  toggle={toggleRulesModal}
  centered // This ensures the modal is vertically centered
  style={{
    maxWidth: "500px", // Customize the width
    margin: "0 auto", // Center horizontally
  }}
>
  <ModalHeader toggle={toggleRulesModal}>Rules and Policies</ModalHeader>
  <ModalBody>
    <p>
      Here are the rules and policies for joining the Jamiya. Please make sure
      to read and understand them carefully.
    </p>
    <ul>
      <li>Rule 1: Description of Rule 1.</li>
      <li>Rule 2: Description of Rule 2.</li>
      <li>Rule 3: Description of Rule 3.</li>
    </ul>
  </ModalBody>
  <ModalFooter>
    <Button color="success" onClick={toggleRulesModal}>
      Close
    </Button>
  </ModalFooter>
</Modal>

    </div>
  );
};

export default AddJamiya;
