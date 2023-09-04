import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store/store";

import type Board from "../../classes/board";

import { setBoardId } from "../../slices/boardEditorSlice";

import BoardItem from "../../components/board/BoardItem";

const BoardEditor = ({ board }: { board: Board }) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setBoardId(board.id || null));
  }, [board]);

  return (
    <StyledBoardEditor>
      {board && 
        <BoardItem board={board} />
      }
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