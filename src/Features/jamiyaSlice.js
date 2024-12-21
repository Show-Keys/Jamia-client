import { createSlice,createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Create a standalone action
export const clearMessage = createAction("jamiyas/clearMessage");

export const saveJamiya=createAsyncThunk("jamiyas/saveJamiya",async(jamiyaData)=>{
    console.log(jamiyaData);
    try{
            const response=await axios.post("http://127.0.0.1:5000/saveJamiya",{

                jcode: jamiyaData.code,
                noMonths:  jamiyaData.nomn,
                startDay:  jamiyaData.startDay,
                endDate:  jamiyaData.endDate,
                description: jamiyaData.description,
                totalShares:jamiyaData.nomn,
 
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
            const response=await axios.post("http://127.0.0.1:5000/getJamiya",{
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
            const response=await axios.get("http://127.0.0.1:5000/getJamiyas");
            return response.data;
    }
    catch(error)
    {
        console.log(error);
    }

    
});

export const updateJamiya = createAsyncThunk("jamiyas/updateJamiya", async (jamiyaData) => {
    try {
        const response = await axios.put("http://127.0.0.1:5000/updateJamiya", {
            jcode: jamiyaData.code,
            participant: jamiyaData.participant,  // User joining
            shares: jamiyaData.shares  // Number of shares the user is selecting
        });
        return response.data;  // Return the updated data or a success message
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update Jamiya');
    }
});


// Async thunk to add a participant
export const addParticipant = createAsyncThunk(
    "jamiyas/addParticipant",
    async ( jamiyaData , { rejectWithValue }) => {
        console.log(jamiyaData);
      try {
        const response = await axios.put(`http://127.0.0.1:5000/jamiya/participants`, {
            jcode:jamiyaData.jcode,
            participantName:jamiyaData.participantName,
            shares:jamiyaData.shares,
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  // Redux action to fetch all participants for a specific Jamiya
export const fetchParticipants = createAsyncThunk("jamiyas/fetchParticipants", async (jcode) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/getParticipants", { jcode }); // Send jcode in the body
      return response.data; // This contains the participants list
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch participants");
    }
  });
  

// Accept a participant
export const acceptParticipant = createAsyncThunk("jamiyas/acceptParticipant", async (participantData) => {
    try {
        const response = await axios.put("http://127.0.0.1:5000/acceptParticipant", {
            jcode: participantData.jcode,
            participantId: participantData.participantId,
        });
        return response.data; // This contains the updated participants list
    } catch (error) {
        console.log(error);
        throw new Error("Failed to accept participant");
    }
});

export const rejectParticipant = createAsyncThunk("jamiyas/rejectParticipant", async (participantData) => {
    try {
        const response = await axios.put("http://127.0.0.1:5000/rejectParticipant", {
            jcode: participantData.jcode,
            participantId: participantData.participantId
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to reject participant');
    }
});



const initValue = {
    Jamiyas:[],
    message:"",
    totalShears:0,
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
                state.totalShears=action.payload.jamiya.totalShares;
                
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

             }) .addCase(addParticipant.pending,(state,action)=>{
                state.isLoading=true;
            })
            .addCase(addParticipant.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.message=action.payload;
                state.Participants=action.payload.participants;
                state.Jamiyas=action.payload.jamiya;
            })
            .addCase(addParticipant.rejected,(state)=>{
                state.isLoading=false;
                state.isError=true;
            }) .addCase(acceptParticipant.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(acceptParticipant.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.Participants = action.payload.participants;
            })
            .addCase(acceptParticipant.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            
            .addCase(rejectParticipant.pending, (state) => {
                state.isLoading = true;
            })  
            .addCase(rejectParticipant.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.Participants = action.payload.participants;
            })
            .addCase(rejectParticipant.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            }) .addCase(fetchParticipants.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(fetchParticipants.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Participants = action.payload.participants;
              })
              .addCase(fetchParticipants.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
              });
    }
});
export default JamiyaSlice.reducer;