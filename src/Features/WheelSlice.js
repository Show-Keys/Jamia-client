// src/slices/wheelSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/wheel'; // Ensure this matches your server endpoint

// Fetch all wheel items
export const fetchWheelItems = createAsyncThunk('wheel/fetchWheelItems', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/getWheelItem`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Server error');
  }
});

// Add a new wheel item
export const addWheelItem = createAsyncThunk('wheel/addWheelItem', async (newItem, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/postWheelItem`, { option: newItem });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Server error');
  }
});

// Delete a wheel item by ID
export const deleteWheelItem = createAsyncThunk('wheel/deleteWheelItem', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/deleteWheelItem/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Server error');
  }
});

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const wheelSlice = createSlice({
  name: 'wheel',
  initialState: {
    items: [],
    live: false,
  },
  reducers: {
    setLive: (state, action) => {
      state.live = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wheel Items
      .addCase(fetchWheelItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWheelItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.items = action.payload;
      })
      .addCase(fetchWheelItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add Wheel Item
      .addCase(addWheelItem.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.items.push(action.payload);
      })

      // Delete Wheel Item
      .addCase(deleteWheelItem.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export const { setLive } = wheelSlice.actions;
export default wheelSlice.reducer;
