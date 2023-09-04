import React from "react";
import styled from "styled-components";

import Cell from "./Cell";

import type Board from "../../classes/board";

const Row = ({ board, row }: { board: Board, row: number }) => {
  return (
    <StyledRow>
      {Array(board.size.cols).fill(0).map((_, i) => 
        <Cell key={`board_${board.code}_row_${row}_${i}`} board={board} row={row} col={i} />
      )}
    </StyledRow>
  );
}

const StyledRow = styled.div`
  display: flex;
  flex: 1 1 100%;

  &:nth-child(n+2) {
    border-top: 1px dashed #aaa;
  }
`;

export default Row;