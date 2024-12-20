import { configureStore } from '@reduxjs/toolkit';
import  JamiyaSlice  from './Features/jamiyaSlice';
import wheelReducer from './Features/WheelSlice';
import UserReducer from './Features/UserSlice';
import AdminReducer from "./Features/AdminSlice";

const Store = configureStore({
  reducer: {
    jamiyas:JamiyaSlice,
    wheel: wheelReducer,
    counter:UserReducer,
    administration:AdminReducer,
  },
});

export default Store;
