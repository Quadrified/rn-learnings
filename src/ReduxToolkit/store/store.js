import { configureStore } from '@reduxjs/toolkit';
import colorSlice from './slices/colorSlice';
import counterSlice from './slices/counterSlice';
import todoSlice from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    color: colorSlice,
    counter: counterSlice,
    todos: todoSlice,
  },
});
