import React from "react";
import styled from "styled-components";

import Slot from "./Slot";

import type Board from "../../classes/board";

const Cell = ({ board, row, col }: { board: Board, row: number, col: number }) => {
  return (
    <StyledCell>
      <Slot 
        board={board}
        row={row} 
        col={col} 
      ></Slot>
    </StyledCell>
  );
}

const StyledCell = styled.div`
  flex: 1 1 auto;
  text-align: center;

  &:nth-child(n+2) {
    border-left: 1px dashed #aaa;
  }
`;

export default Cell;