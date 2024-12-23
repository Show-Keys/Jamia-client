import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Features/UserSlice';
import wheelReducer from './Features/WheelSlice';
import jamiyaReducer from './Features/jamiyaSlice';
import resultReducer from './Features/ResultSlice';
import paymentReducer from './Features/PaymentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    wheel: wheelReducer,
    jamiyas: jamiyaReducer,
    results: resultReducer,
    payment: paymentReducer,
  },
});

export default store;
