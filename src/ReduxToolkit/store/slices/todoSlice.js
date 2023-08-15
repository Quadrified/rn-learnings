/**
 * Redux Toolkit with API call
 */

import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

// https://jsonplaceholder.typicode.com/todos

// Step 1: API calls created using createAsyncThunk
// This "action" will be "dispatched" when calling APIs from UI
export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
  const todoResponse = await fetch(
    'https://jsonplaceholder.typicode.com/todos'
  );
  return todoResponse.json();
});

const initialState = {
  isLoading: false,
  isError: false,
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    postsAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
  // Step 2: Create extraReducers with cases pending, fulfilled, rejected to handle API data
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        console.log('>>>Error<<<', action.payload);
        state.isError = true;
      });
  },
});

// Creating a selector
export const selectAllTodos = (state) => state.todos.todos;

export default todoSlice.reducer;
