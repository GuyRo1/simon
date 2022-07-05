import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Score} from '../../models/scoreModel';

interface bestScoreState {
  list: Score[];
}

const initialState: bestScoreState = {
  list: [],
};

const bestScores = createSlice({
  name: 'bestScores',
  initialState,
  reducers: {
    setRecords(state: bestScoreState, action: PayloadAction<Score[]>) {
      state.list = action.payload;
    },
  },
});

export const {setRecords} = bestScores.actions;
export default bestScores.reducer;
