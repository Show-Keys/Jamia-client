import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Redux thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); // Adjust the URL if needed
        return response.data; // Return users data
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message); // Handle error
      }
    }
  );
  



const adminSlice = createSlice({
    name: 'admin',
    initialState: {
      users: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllUsers.pending, (state) => {
          state.loading = true; // Set loading state
          state.error = null; // Reset any previous error
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
          state.loading = false; // Set loading to false once data is fetched
          state.users = action.payload; // Store the fetched users in the state
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
          state.loading = false; // Set loading to false
          state.error = action.payload || 'Failed to fetch users'; // Set error message
        });
    },
  });
  
  export default adminSlice.reducer;
  