import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: null,
  isAdmin: false,
  loading: false,
  error: null,
  message: '',
};

export const registerUser = createAsyncThunk('user/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/register', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
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
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
