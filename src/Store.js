import { configureStore } from '@reduxjs/toolkit';
import  JamiyaSlice  from './Features/jamiyaSlice';
import wheelReducer from './Features/WheelSlice';

const Store = configureStore({
  reducer: {
    jamiyas:JamiyaSlice,
    wheel: wheelReducer
  },
});

export default Store;
