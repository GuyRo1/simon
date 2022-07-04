import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented(state: CounterState) {
      state.value++;
    },
    amountAdded(state: CounterState, action: PayloadAction<number>) {
      const value = action.payload;

      state.value += value;
    },
  },
});

export const {incremented, amountAdded} = counterSlice.actions;
export default counterSlice.reducer;
