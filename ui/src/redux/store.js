import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export default store;