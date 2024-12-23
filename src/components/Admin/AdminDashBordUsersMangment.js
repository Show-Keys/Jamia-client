import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchUsers, deleteUser } from '../../Features/UserSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

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

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  margin: 10px;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e07b00;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AdminDashBordUsersMangment = () => {
  const { users, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <Container>
      <h2>Manage Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button onClick={() => handleDeleteUser(user._id)} disabled={isLoading}>
                    Delete
                  </Button>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="3" style={{ textAlign: 'center' }}>No users available</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashBordUsersMangment;