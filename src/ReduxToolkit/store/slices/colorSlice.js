import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const randomRGB = () =>
  `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColor: (state) => {
      state.value = [...state.value.reverse(), randomRGB()];
    },
  },
});

export const { setColor } = colorSlice.actions;

export default colorSlice.reducer;
