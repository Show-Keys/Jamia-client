import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdmin = createAsyncThunk("administration/getAdmin", async (adminData) => {
    try {
      const response = await axios.post("http://localhost:8080/adminLogin", {
            email:adminData.email,
            password:adminData.password,
        });

        return response.data.Admins;
  
    } catch (error) {
      alert("Invaild Credentials: "+error);
      return{};
    }
  });

  const initialValues = {
    Admins:{},
    message:"",
    isLoading:false,
    isSucces:false,
    isError:false
  };

export const AdminReducer = createSlice({
    name: "administration",
    initialState: initialValues,
    reducers: {},
    extraReducers:(builder)=>{
      builder.addCase(getAdmin.pending,(state)=>{
              state.isLoading=true;
              })
             .addCase(getAdmin.fulfilled,(state,action)=>{
              state.isLoading=false;
              state.isSucces=true;
              state.Admins=action.payload;
             })
             .addCase(getAdmin.rejected,(state)=>{
              state.isLoading=false;
              state.isError=true;
             })
    }
  });

export default AdminReducer.reducer;
