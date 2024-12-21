import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch results from the server
export const fetchResults = createAsyncThunk('results/fetchResults', async () => {
  const response = await axios.get('/api/results/getresult');
  return response.data;
});

// Async thunk to add a new result to the server
export const addResultToServer = createAsyncThunk('results/addResultToServer', async (newResult) => {
  const response = await axios.post('/api/results/addresult', newResult);
  return response.data;
});

const resultSlice = createSlice({
  name: 'results',
  initialState: {
    data: [], // Ensure data is always an array
    status: 'idle',
    error: null,
  },
  reducers: {
    addResult: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload || []; // Ensure data is always an array
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addResultToServer.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export const { addResult } = resultSlice.actions;
export default resultSlice.reducer;