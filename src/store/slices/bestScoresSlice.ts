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
    addScore(state: bestScoreState, action: PayloadAction<Score[]>) {
      state.list = action.payload;
    },
  },
});

export const {addScore} = bestScores.actions;
export default bestScores.reducer;
