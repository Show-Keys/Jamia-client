import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../Features/adminSlice'; // Adjust the import path accordingly

const AdminUsers = () => {
  const dispatch = useDispatch();
  const  users  = useSelector((state) => state.admin.users || []); // Assuming you have admin slice in your Redux store
  console.log(users);
  

  useEffect(() => {
    // Dispatch action to load all users
    dispatch(fetchAllUsers());
  }, [dispatch]);

//   if (loading) return <div>Loading users...</div>;

//   if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
