import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Features/UserSlice';
import wheelReducer from './Features/WheelSlice';
import jamiyaReducer from './Features/jamiyaSlice';
// import adminReducer from './Features/AdminSlice';
import resultReducer from './Features/ResultSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    wheel: wheelReducer,
    jamiyas: jamiyaReducer,
    // administration: adminReducer,
    results: resultReducer,
  },
});

export default store;
