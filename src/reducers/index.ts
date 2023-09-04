import { combineReducers } from '@reduxjs/toolkit';

import sceneSlice from '../slices/sceneSlice';
import inventorySlice from '../slices/inventorySlice';
import boardEditorSlice from '../slices/boardEditorSlice';

export const reducer = combineReducers({
  scene: sceneSlice.reducer,
  inventory: inventorySlice.reducer,
  boardEditor: boardEditorSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;