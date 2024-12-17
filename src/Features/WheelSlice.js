// src/slices/wheelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const wheelSlice = createSlice({
  name: 'wheel',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.data.push({ option: action.payload });
    },
    deleteItem: (state, action) => {
      state.data = state.data.filter((_, index) => index !== action.payload);
    },
    setWheelData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addItem, deleteItem, setWheelData } = wheelSlice.actions;
export default wheelSlice.reducer;

