import React from "react";
import { Provider } from 'react-redux';

import { store } from './store/store';

import GameLayout from "./layouts/GameLayout";
import SceneController from "./scenes";

const TileMaster = () => {
  return (
    <Provider store={store}>
      <GameLayout>
        <SceneController />
      </GameLayout>
    </Provider>
  );
}

export default TileMaster;