import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

import { 
  TILE_FILLED
} from "../../constants/block";

import type Block from "../../classes/block";
import type { RootState } from "../../reducers";

const Tile = memo(({ block, row, col }: { block: Block, row: number, col: number }) => {
  const tileState = block.getPositionState({ row, col });
  const TileStyle = tileState === TILE_FILLED ? FilledTile : BasicTile;

  const isUsable = useSelector<RootState, boolean>(state => state.inventory.blocks[block.id]?.editor?.isUsable ?? false);

  return (
    <TileStyle
      $isUsable={isUsable}
    ></TileStyle>
  );
});

const BasicTile = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 100%;
`;

const FilledTile = styled(BasicTile)<{ $isUsable: boolean, $isActive?: boolean }>`
  border: 1px dashed #aaa;
  background-color: #fff;

  ${props => props.$isUsable && css`
    background-color: #d7ebf4;
  `}

  ${props => props.$isActive && css`
    background-color: #206bf9;
  `}
`;

export default Tile;