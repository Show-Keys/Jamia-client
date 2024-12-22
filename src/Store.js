import { configureStore } from '@reduxjs/toolkit';
import JamiyaSlice from './Features/jamiyaSlice';
import wheelReducer from './Features/WheelSlice';
import authReducer from './Features/UserSlice';
import  adminSlice  from './Features/adminSlice';

const store  = configureStore({
  reducer: {
    jamiyas:JamiyaSlice,
    wheel: wheelReducer,
    auth: authReducer,
    admin:adminSlice,
  },
});

export default store ;
