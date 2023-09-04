import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

import { 
  TILE_EMPTY,
  TILE_FILLED
} from "../../constants/block";

import type { RootState } from "../../reducers";
import type { SceneTypes } from "../../scenes";
import type Block from "../../classes/block";
import type { TileState } from "../../classes/block";

const Tile = ({ block, row, col }: { block: Block, row: number, col: number }) => {
  const sceneName = useSelector<RootState, SceneTypes>(state => state.scene.sceneName);
  const tileState = block.getPositionState({ row, col });

  return (
    <StyledTile
      $tileState={tileState}
    ></StyledTile>
  );
}

const StyledTile = styled.div<{ $tileState: TileState }>`
  & {
    position: relative;
    height: 0;
    padding-bottom: 100%;
  }

  ${props => props.$tileState === TILE_FILLED && css`
    border: 1px dashed #aaa;
    background: #fff;
  `}

  .block.usable .cell .cell-inner[data-tile-state="0"] {
    background-color: #d7ebf4;
  }

  .block.active .cell .cell-inner[data-tile-state="0"] {
    border-color: #206bf9;
  }
`;

export default Tile;