import React from "react";
import styled from "styled-components";

import Cell from "./Cell";

import type Block from "../../classes/block";

const Row = ({ block, row }: { block: Block, row: number }) => {
  return (
    <StyledRow>
      {Array(block.size.cols).fill(0).map((_, i) => 
        <Cell key={`block_${block.id}_row_${row}_${i}`} block={block} row={row} col={i} />
      )}
    </StyledRow>
  );
}

const StyledRow = styled.div`
  display: flex;
  flex: 0 1 auto;
`;

export default Row;