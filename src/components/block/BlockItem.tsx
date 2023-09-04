import React from "react";
import styled from "styled-components";

import type Block from "../../classes/block";

import Row from "./Row";

const BlockItem = ({ block }: { block: Block }) => {
  return (
    <StyledBlock>
      {new Array(block.size.rows).fill(0).map((_, i) => 
        <Row key={`block_${block.id}_row_${i}`} block={block} row={i} />
      )}
    </StyledBlock>
  );
}

const StyledBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start
`;

export default BlockItem;