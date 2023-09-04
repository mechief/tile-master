import { combineReducers } from '@reduxjs/toolkit';

import boardEditorSlice from '../slices/boardEditorSlice';

export const editorReducer = combineReducers({
  board: boardEditorSlice.reducer,
});
