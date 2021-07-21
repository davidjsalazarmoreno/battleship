import { createAction, createReducer } from '@reduxjs/toolkit';

export type ConfigurationState = {
  turns: number | null;
};

const initialState: ConfigurationState = {
  turns: null,
};

const SELECT_GAME_DIFFICULTY = '@score/select-game-difficulty';
const RESET_GAME_DIFFICULTY = '@score/reset-game-difficulty';

export const selectGameDifficulty = createAction<
  number,
  typeof SELECT_GAME_DIFFICULTY
>(SELECT_GAME_DIFFICULTY);

export const resetGameDifficulty = createAction(RESET_GAME_DIFFICULTY);

export const configurationReducer = createReducer(initialState, builder => {
  builder
    .addCase(selectGameDifficulty, (state, action) => {
      state.turns = action.payload;
    })
    .addCase(resetGameDifficulty, state => {
      state.turns = null;
    });
});
