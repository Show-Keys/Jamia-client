import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initValue = {
  admin: null,
  user: null,
  token: null,
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
  isAuthenticated: false,
};

export const addUser = createAsyncThunk("user/addUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/insertUser", {
      fullName: userData.fullName,
      uname: userData.uname,
      pnumber: userData.pnumber,
      password: userData.password,
      adminCode: userData.adminCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user", error);
    return rejectWithValue(error.response.data);
  }
});

export const userLogin = createAsyncThunk("user/userLogin", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/userLogin", {
      uname: userData.uname,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user", error);
    return rejectWithValue(error.response.data);
  }
});

export const adminLogin = createAsyncThunk("user/adminLogin", async (adminData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/adminLogin", {
      uname: adminData.uname,
      password: adminData.password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in admin", error);
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: initValue,
  reducers: {
    resetState: (state) => {
      state.admin = null;
      state.user = null;
      state.message = "";
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isAuthenticated = false;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to add user";
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to log in user";
      })
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload.admin;
        state.message = action.payload.message;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to log in admin";
      });
  },
});

export const { resetState, setUserToken, logout } = userSlice.actions;
export default userSlice.reducer;