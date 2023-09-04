import React, { memo } from "react";
import styled from "styled-components";

import Tile from "./Tile";

import type Block from "../../classes/block";

const Cell = memo(({ block, row, col }: { block: Block, row: number, col: number }) => {
  return (
    <StyledCell>
      <Tile 
        block={block}
        row={row} 
        col={col} 
      ></Tile>
    </StyledCell>
  );
});

const StyledCell = styled.div`
  flex: 1 1 auto;
  width: 30px;
  text-align: center;
`;

export default Cell;