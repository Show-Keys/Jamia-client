import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: null,
  isAdmin: false,
  loading: false,
  error: null,
  message: '',
  users: [], // Add users array to manage users
  jamiya: null, // Add jamiya to manage jamiya state
};

// Async thunk to register a user
export const registerUser = createAsyncThunk('user/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/register', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to login a user
export const loginUser = createAsyncThunk('user/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch all users
 const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to delete a user
 const deleteUser = createAsyncThunk('user/deleteUser', async (userId, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${userId}`);
    return userId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null; // Set user data
        state.token = action.payload.token || null; // Set token
        state.isAdmin = action.payload.user?.isAdmin || false; // Set isAdmin
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token); // Store token in localStorage
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null; // Set user data
        state.token = action.payload.token || null; // Set token
        state.message = action.payload.message || '';
        state.isAdmin = action.payload.user?.isAdmin || false; // Set isAdmin
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token); // Store token in localStorage
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete user';
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
export { fetchUsers, deleteUser };