import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch results from the server
export const fetchResults = createAsyncThunk('results/fetchResults', async (userId, thunkAPI) => {
  try {
    const response = await axios.get(`/api/results/getresult/${userId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to add a new result to the server
export const addResultToServer = createAsyncThunk('results/addResultToServer', async (newResult, thunkAPI) => {
  try {
    const response = await axios.post('/api/results/addresult', newResult);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const resultSlice = createSlice({
  name: 'results',
  initialState: {
    data: [], // Ensure data is always an array
    status: 'idle',
    error: null,
  },
  reducers: {},
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
        state.error = action.payload || 'Failed to fetch results';
      })
      .addCase(addResultToServer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addResultToServer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(addResultToServer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to add result';
      });
  },
});

export default resultSlice.reducer;