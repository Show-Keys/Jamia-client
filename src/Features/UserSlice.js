import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initValue = {
    admin: null,
    user: null,
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const addUser = createAsyncThunk("counter/addUser", async (userData) => {
    try {
        const response = await axios.post("http://localhost:8080/insertUser", {
            fullName: userData.fullName,
            uname: userData.uname,
            pnumber: userData.pnumber,
            password: userData.password,
            conpassword: userData.confirmPassword,  // Make sure to match the field name
            admincode: userData.admincode,
        });
        const msg = response.data;
        return msg;
    } catch (error) {
        console.error("Error adding user", error);
        throw error;  // Re-throw the error to handle in the component
    }
});

export const getUser = createAsyncThunk("counter/getUser", async (userData) => {
    try {
        const response = await axios.post("http://localhost:8080/userLogin", {
            password: userData.password,
            uname: userData.uname,
        });
        return response.data.user;
    } catch (error) {
        console.error("Invalid Credentials", error);
        return null; // Ensure null value is returned to reset state
    }
});


export const getAdmin=createAsyncThunk("counter/getAdmin",async(userData)=>{
    try{
            const response=await axios.post("http://localhost:8080/adminLogin",{
                password:userData.password,
                aname:userData.aname,
            });
            //console.log(response.data.user);
            return response.data.admin;
            
    }
    catch(error)
    {
        alert("Invalid Credentials "+error);
        initValue.admin={};
    }
});

export const resetUserState = createSlice({
    name: "counter",
    initialState: initValue,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.rejected, (state) => {
            state.user = null; // Reset user on failure
        });
    },
});

export const UserSlice=createSlice({
    name:"counter",
    initialState:initValue,
    extraReducers:(builder)=>{
        builder.addCase(addUser.pending,(state,action)=>{
                state.isLoading=true;
                state.actPending=action.payload;
            })
            .addCase(addUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
            })
            .addCase(addUser.rejected,(state)=>{
                state.isLoading=false;
                state.isError=true;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null; // Reset user on failure
            })
            .addCase(getAdmin.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getAdmin.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.user=action.payload;
            })
            .addCase(getAdmin.rejected,(state)=>{
                state.isLoading=false;
                state.isError=true;
            })
    }
});
export default UserSlice.reducer;