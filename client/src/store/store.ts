import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import sectionReducer from'../features/sections/sectionSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    section:sectionReducer,
  },
});

// Define types for dispatch and state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
