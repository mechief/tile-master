import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../reducers";

import Board from "../../classes/board";

import type { BoardsMap } from "../../slices/inventorySlice";

import BoardWithDetail from "./BoardWithDetail";

const BoardEditor = () => {
  const boards = useSelector<RootState, BoardsMap>(state => state.inventory.boards);

  const boardData = boards[Object.keys(boards)[0]];

  const board = useMemo(() => new Board({ data: boardData }), [boardData]);

  return (
    <StyledBoardEditor>
      <BoardWithDetail board={board} />
    </StyledBoardEditor>
  );
}

const StyledBoardEditor = styled.div`
  position: relative;
  width: 66%;

  &.mode-equipment:before {
    content: "블록을 장착할 슬롯을 선택해 주세요.";
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: #fcffdf;
    opacity: 0.5;
    text-align: center;
  }

  &.mode-equipment:hover:before {
    display: none;
  }
`;

export default BoardEditor;