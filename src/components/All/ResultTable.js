import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchResults, addResultToServer } from '../../Features/ResultSlice';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f4f4f4;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const ResultTable = () => {
  const results = useSelector((state) => state.results.data || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch]);

  const handleAddResult = (winner, amount, status) => {
    const newResult = {
      date: new Date().toLocaleString(),
      winner: winner,
      number: results.length + 1,
      amount: amount,
      status: status,
    };
    dispatch(addResultToServer(newResult));
  };

  return (
    <div>
      <h2>Results Table</h2>
      <button onClick={() => handleAddResult('New Winner', 100, 'pending')}>Add Result</button>
      <Table>
        <thead>
          <tr>
            <Th>Date</Th>
            <Th>Winner</Th>
            <Th>Number</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((result, index) => (
              <tr key={index}>
                <Td>{result.date}</Td>
                <Td>{result.winner}</Td>
                <Td>{result.number}</Td>
                <Td>{result.amount}</Td>
                <Td>{result.status}</Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="5" style={{ textAlign: 'center' }}>No results available</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ResultTable;