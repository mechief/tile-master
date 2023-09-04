import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { SceneTypes } from "../scenes";

import {
  SCENE_CHOOSE_ITEM
} from "../constants/scene";

export interface SceneState {
  sceneName: SceneTypes;
}

const initialState: SceneState = {
  sceneName: SCENE_CHOOSE_ITEM
}

const sceneSlice = createSlice({
  name: 'scene',
  initialState: initialState,

  reducers: {
    setScene: (state, action: PayloadAction<SceneTypes>) => {
      state.sceneName = action.payload;
    }
  },
});

export const {
  setScene,
} = sceneSlice.actions;

export default sceneSlice;