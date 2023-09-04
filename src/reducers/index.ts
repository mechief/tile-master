import { combineReducers } from '@reduxjs/toolkit';

import { editorReducer } from './editor';

import sceneSlice from '../slices/sceneSlice';
import inventorySlice from '../slices/inventorySlice';

export const reducer = combineReducers({
  scene: sceneSlice.reducer,
  inventory: inventorySlice.reducer,
  editor: editorReducer
});

export type RootState = ReturnType<typeof reducer>;