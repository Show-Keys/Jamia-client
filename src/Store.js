import { configureStore } from '@reduxjs/toolkit';
import JamiyaSlice from './Features/jamiyaSlice';
import wheelReducer from './Features/WheelSlice';
import userReducer from './Features/UserSlice';
import adminReducer from './Features/AdminSlice';
import resultReducer from './Features/ResultSlice';

const store = configureStore({
  reducer: {
    jamiyas: JamiyaSlice,
    wheel: wheelReducer,
    counter: userReducer,
    administration: adminReducer,
    results: resultReducer,
  },
});

export default store;
