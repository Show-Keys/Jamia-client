import { createSlice,createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Create a standalone action
export const clearMessage = createAction("jamiyas/clearMessage");

export const saveJamiya=createAsyncThunk("jamiyas/saveJamiya",async(jamiyaData)=>{
    console.log(jamiyaData);
    try{
            const response=await axios.post("http://127.0.0.1:8080/saveJamiya",{

                jcode: jamiyaData.code,
                noMembers:  jamiyaData.nome,
                noMonths:  jamiyaData.nomn,
                startDay:  jamiyaData.startDay,
                endDate:  jamiyaData.endDate,
                description: jamiyaData.description,
                
 
            });
            const msg=response.data;
            return msg;
            

    }
    catch(error)
    {
        console.log(error);
    }
});


export const getJamiya=createAsyncThunk("jamiyas/getJamiya",async(data)=>{
    try{
            const response=await axios.post("http://127.0.0.1:8080/getJamiya",{
                jcode:data,
            });
            return response.data;


    }
    catch(error)
    {
        console.log(error);
        initValue.Jamiyas={};
    }
});


export const getJamiyas=createAsyncThunk("jamiyas/getJamiyas",async()=>{
    try{
            const response=await axios.get("http://127.0.0.1:8080/getJamiyas");
            return response.data;
    }
    catch(error)
    {
        console.log(error);
    }

    
});


const initValue = {
    Jamiyas:[],
    message:"",
    Participants:[],
    turns:[],
    isLoading:false,
    isSuccess:false,
    isError:false
}



export const JamiyaSlice=createSlice({
    name:"jamiyas",
    initialState:initValue,

    extraReducers:(builder)=>{
        builder.addCase(saveJamiya.pending,(state)=>{
                state.isLoading=true;
                
            })
            .addCase(saveJamiya.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.message=action.payload;
            })
            .addCase(saveJamiya.rejected,(state)=>{
                state.isLoading=false;
                state.isError=true;
            }).addCase(clearMessage, (state) => {
                state.message = ""; // Handle clearMessage action
              })
            .addCase(getJamiya.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getJamiya.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.Jamiyas=action.payload.jamiya;
                state.message =action.payload.message;
                
            })
            .addCase(getJamiya.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.message =action.payload;

            }).addCase(getJamiyas.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getJamiyas.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.Jamiyas=action.payload.jamiya;
                state.message =action.payload.message;
                
            })
            .addCase(getJamiyas.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.message =action.payload;

            })
            // .addCase(updateJamiya.pending,(state)=>{
            //     state.isLoading=true;
            // })
            // .addCase(updateJamiya.fulfilled,(state,action)=>{
            //     state.isLoading=false;
            //     state.isSuccess=true;
            //     state.Posts=action.payload;
                
            // })
            // .addCase(updateJamiya.rejected,(state)=>{
            //     state.isLoading=false;
            //     state.isError=true;
            // })
    }
});
export default JamiyaSlice.reducer;