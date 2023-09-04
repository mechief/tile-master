import React from "react";
import styled from "styled-components";

import type Board from "../../classes/board";

import Row from "./Row";

const BoardItem = ({ board }: { board: Board }) => {
  return (
    <StyledBoard>
      {new Array(board.size.rows).fill(0).map((_, i) => 
        <Row key={`board_${board.code}_row_${i}`} board={board} row={i} />
      )}
    </StyledBoard>
  );
}

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #555;
`;

export default BoardItem;