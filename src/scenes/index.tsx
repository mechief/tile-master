import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import type { RootState } from '../reducers'

import {
  SCENE_CHOOSE_ITEM,
  SCENE_INVENTORY,
  SCENE_EDITOR_BOARD
} from "../constants/scene";

import SceneChooseItem from "./getReward/SceneChooseItem";
import SceneEditorBoard from "./editorBoard/SceneEditorBoard";

export type SceneTypes = typeof SCENE_CHOOSE_ITEM | typeof SCENE_INVENTORY | typeof SCENE_EDITOR_BOARD;

const SceneController = () => {
  const sceneName = useSelector<RootState, SceneTypes>((state) => state.scene.sceneName);

  const Scene = useMemo(() => {
    const _scene = sceneName === SCENE_CHOOSE_ITEM ? SceneChooseItem : SceneEditorBoard;
    
    return _scene;
  }, [sceneName]);
  
  return (
    <Scene />
  );
}

export default SceneController;