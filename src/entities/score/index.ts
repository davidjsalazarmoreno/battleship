import { createAction, createReducer } from '@reduxjs/toolkit';
import { Score } from 'app/game-logic/types';

export type ScoreState = {
  lastMatch: Score | null;
};

const initialState: ScoreState = {
  lastMatch: null,
};

const ADD_MATCH_RESULT = '@score/add-match-result';
const RESET_MATCH_RESULT = '@score/reset-match-result';

export const addMatchResult = createAction<Score, typeof ADD_MATCH_RESULT>(
  ADD_MATCH_RESULT,
);

export const resetMatchResult = createAction(RESET_MATCH_RESULT);

export const scoreReducer = createReducer(initialState, builder => {
  builder
    .addCase(addMatchResult, (state, action) => {
      state.lastMatch = action.payload;
    })
    .addCase(resetMatchResult, state => {
      state.lastMatch = null;
    });
});
