import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface gameDataState {
  endGameStatus: number | null;
  score: number;
  phase: string;
  highlight: number | null;
}

const initialState: gameDataState = {
  endGameStatus: null,
  score: -1,
  phase: 'pending',
  highlight: null,
};

const gameData = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    bumpScore(state: gameDataState) {
      state.score++;
    },
    reset(state: gameDataState) {
      state.endGameStatus = null;
      state.score = -1;
      state.highlight = null;
      state.phase = 'machine';
    },
    setHighLight(state: gameDataState, action: PayloadAction<null | number>) {
      state.highlight = action.payload;
    },
    setPhase(state: gameDataState, action: PayloadAction<string>) {
      state.phase = action.payload;
    },
    setEndGameStatus(
      state: gameDataState,
      action: PayloadAction<number | null>,
    ) {
      state.endGameStatus = action.payload;
    },
  },
});

export const {bumpScore, reset, setHighLight, setPhase, setEndGameStatus} =
  gameData.actions;
export default gameData.reducer;
