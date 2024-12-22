// import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initValue = {
//     admin: null,
//     user: null,
//     message: "",
//     isLoading: false,
//     isSuccess: false,
//     isError: false,
// };

// export const addUser = createAsyncThunk("counter/addUser", async (userData) => {
//     try {
//         const response = await axios.post("http://localhost:8080/insertUser", {
//             fullName: userData.fullName,
//             uname: userData.uname,
//             pnumber: userData.pnumber,
//             password: userData.password,
//             conpassword: userData.confirmPassword,  // Make sure to match the field name
//             admincode: userData.admincode,
//         });
//         const msg = response.data;
//         return msg;
//     } catch (error) {
//         console.error("Error adding user", error);
//         throw error;  // Re-throw the error to handle in the component
//     }
// });

// export const getUser = createAsyncThunk("counter/getUser", async (userData) => {
//     try {
//         const response = await axios.post("http://localhost:8080/userLogin", {
//             password: userData.password,
//             uname: userData.uname,
//         });
//         return response.data.user;
//     } catch (error) {
//         console.error("Invalid Credentials", error);
//         return null; // Ensure null value is returned to reset state
//     }
// });


// export const getAdmin=createAsyncThunk("counter/getAdmin",async(userData)=>{
//     try{
//             const response=await axios.post("http://localhost:8080/adminLogin",{
//                 password:userData.password,
//                 aname:userData.aname,
//             });
//             //console.log(response.data.user);
//             return response.data.admin;
            
//     }
//     catch(error)
//     {
//         alert("Invalid Credentials "+error);
//         initValue.admin={};
//     }
// });

// export const resetUserState = createSlice({
//     name: "counter",
//     initialState: initValue,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getUser.rejected, (state) => {
//             state.user = null; // Reset user on failure
//         });
//     },
// });

// export const UserSlice=createSlice({
//     name:"counter",
//     initialState:initValue,
//     extraReducers:(builder)=>{
//         builder.addCase(addUser.pending,(state,action)=>{
//                 state.isLoading=true;
//                 state.actPending=action.payload;
//             })
//             .addCase(addUser.fulfilled,(state,action)=>{
//                 state.isLoading=false;
//                 state.isSuccess=true;
//             })
//             .addCase(addUser.rejected,(state)=>{
//                 state.isLoading=false;
//                 state.isError=true;
//             })
//             .addCase(getUser.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(getUser.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.isSuccess = true;
//                 state.user = action.payload;
//             })
//             .addCase(getUser.rejected, (state) => {
//                 state.isLoading = false;
//                 state.isError = true;
//                 state.user = null; // Reset user on failure
//             })
//             .addCase(getAdmin.pending,(state)=>{
//                 state.isLoading=true;
//             })
//             .addCase(getAdmin.fulfilled,(state,action)=>{
//                 state.isLoading=false;
//                 state.isSuccess=true;
//                 state.user=action.payload;
//             })
//             .addCase(getAdmin.rejected,(state)=>{
//                 state.isLoading=false;
//                 state.isError=true;
//             })
//     }
// });
// export default UserSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user registration
export const registerUser = createAsyncThunk('https://jamia-server.onrender.com/auth/registerUser',async (userData, { rejectWithValue }) => {
  console.log(userData); 
  try {
      const response = await axios.post('https://jamia-server.onrender.com/api/register',{
        
        name:userData.name,
        email:userData.email,
        password:userData.password,
        phoneNumber:userData.pnumber,
        profileImage:userData.profilepic,


      } );
      return response.data; // Data returned from the server (user + token)
      console.log('Thunk response:', response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Return error message
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://jamia-server.onrender.com/api/login',{       
        email:loginData.email,
        password:loginData.password,
      });
      return response.data; // Data returned from the server (user + token)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Return error message
    }
  }
);

// Initial state for auth
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null, // Token from localStorage if available
  isAdmin: false,
  loading: false,
  error: null,
  message:"",
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Set user data
        state.token = action.payload.token; // Set token
        localStorage.setItem('token', action.payload.token); // Store token in localStorage
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
        state.user = action.payload.user; // Set user data
        state.token = action.payload.token; // Set token
        state.message=action.payload.message;
        state.isAdmin=action.payload.user.isAdmin;
        localStorage.setItem('token', action.payload.token); // Store token in localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
