import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWheelItems = createAsyncThunk('wheel/fetchWheelItems', async () => {
  const response = await axios.get('http://localhost:5000/api/wheel/items');
  return response.data;
});

export const addWheelItem = createAsyncThunk('wheel/addWheelItem', async (item) => {
  const response = await axios.post('http://localhost:5000/api/wheel/addItem', { item });
  return response.data;
});

export const deleteWheelItem = createAsyncThunk('wheel/deleteWheelItem', async (id) => {
  const response = await axios.delete(`http://localhost:5000/api/wheel/deleteItem/${id}`);
  return response.data;
});

const wheelSlice = createSlice({
  name: 'wheel',
  initialState: {
    items: [],
    liveItems: [],
  },
  reducers: {
    setLive: (state, action) => {
      state.liveItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWheelItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addWheelItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteWheelItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      });
  },
});

export const { setLive } = wheelSlice.actions;
export default wheelSlice.reducer;
