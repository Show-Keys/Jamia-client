import React, { useState } from "react";
import { Container, Row, Col, Input, Button, Form, FormGroup, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { addShares } from "../../Features/jamiyaSlice";
import { useParams } from "react-router-dom";

const JamiyaDetails = () => {
  const { jamiyaId } = useParams();
  const dispatch = useDispatch();
  const { jamiya } = useSelector((state) => state.jamiya);
  const [numShares, setNumShares] = useState(1);
  const [amount, setAmount] = useState("");

  const handleAddShares = () => {
    dispatch(addShares({ jamiyaId, numShares, amount }));
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h4>{jamiya?.name}</h4>
          <p>{jamiya?.description}</p>
        </Col>
      </Row>
      <Form>
        <FormGroup>
          <Label for="numShares">Number of Shares</Label>
          <Input
            type="number"
            id="numShares"
            value={numShares}
            onChange={(e) => setNumShares(e.target.value)}
            min="1"
          />
        </FormGroup>
        <FormGroup>
          <Label for="amount">Payment Amount</Label>
          <Input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormGroup>
        <Button color="primary" onClick={handleAddShares}>
          Add Shares
        </Button>
      </Form>
    </Container>
  );
};

export default JamiyaDetails;