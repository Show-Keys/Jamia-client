import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Create a standalone action
export const clearMessage = createAction("jamiyas/clearMessage");

export const saveJamiya = createAsyncThunk("jamiyas/saveJamiya", async (jamiyaData, thunkAPI) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/jamiya/saveJamiya", {
      jcode: jamiyaData.code,
      noMonths: jamiyaData.nomn,
      startDay: jamiyaData.startDay,
      endDate: jamiyaData.endDate,
      description: jamiyaData.description,
      totalShares: jamiyaData.nomn,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getJamiya = createAsyncThunk("jamiyas/getJamiya", async (data, thunkAPI) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/jamiya/getJamiya", {
      jcode: data,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getJamiyas = createAsyncThunk("jamiyas/getJamiyas", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/jamiya/getJamiyas");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addParticipant = createAsyncThunk('jamiya/addParticipant', async (participantData, thunkAPI) => {
  try {
    const response = await axios.put('/api/jamiya/addParticipant', participantData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchParticipants = createAsyncThunk("jamiyas/fetchParticipants", async (jcode, thunkAPI) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/jamiya/getParticipants", { jcode });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const acceptParticipant = createAsyncThunk("jamiyas/acceptParticipant", async (participantData, thunkAPI) => {
  try {
    const response = await axios.put("http://127.0.0.1:5000/api/jamiya/acceptParticipant", {
      jcode: participantData.jcode,
      participantId: participantData.participantId,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const rejectParticipant = createAsyncThunk("jamiyas/rejectParticipant", async (participantData, thunkAPI) => {
  try {
    const response = await axios.put("http://127.0.0.1:5000/api/jamiya/rejectParticipant", {
      jcode: participantData.jcode,
      participantId: participantData.participantId,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteJamiya = createAsyncThunk('jamiya/deleteJamiya', async (jcode, thunkAPI) => {
  try {
    const response = await axios.delete(`/api/jamiya/deleteJamiya/${jcode}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const jamiyaSlice = createSlice({
  name: 'jamiya',
  initialState: {
    jamiyas: [],
    currentJamiya: null,
    loading: false,
    error: null,
    message: '',
  },
  reducers: {
    clearParticipants(state) {
      state.Participants = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveJamiya.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveJamiya.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(saveJamiya.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to save Jamiya';
      })
      .addCase(clearMessage, (state) => {
        state.message = "";
      })
      .addCase(getJamiya.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJamiya.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJamiya = action.payload.jamiya;
        state.message = action.payload.message;
      })
      .addCase(getJamiya.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to get Jamiya';
      })
      .addCase(getJamiyas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJamiyas.fulfilled, (state, action) => {
        state.loading = false;
        state.jamiyas = action.payload.jamiya;
        state.message = action.payload.message;
      })
      .addCase(getJamiyas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to get Jamiyas';
      })
      .addCase(addParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addParticipant.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJamiya = action.payload.jamiya;
      })
      .addCase(addParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add participant';
      })
      .addCase(acceptParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptParticipant.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.Participants = action.payload.participants;
      })
      .addCase(acceptParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to accept participant';
      })
      .addCase(rejectParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectParticipant.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.Participants = action.payload.participants;
      })
      .addCase(rejectParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to reject participant';
      })
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.Participants = action.payload.participants;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch participants';
      })
      .addCase(deleteJamiya.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJamiya.fulfilled, (state, action) => {
        state.loading = false;
        state.jamiyas = state.jamiyas.filter(jamiya => jamiya.jcode !== action.meta.arg);
      })
      .addCase(deleteJamiya.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete Jamiya';
      });
  },
});

export default jamiyaSlice.reducer;