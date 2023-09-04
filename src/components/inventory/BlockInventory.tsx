import React from "react";
import styled from "styled-components";

import Block from "../../classes/block";

import BlockItem from "../block/BlockItem";

const BlockInventory = ({ blocks }: { blocks: Block[] }) => {
  return (
    <StyledBlockInventory>
      {blocks.map(block =>
        <BlockItem key={`inventory_block_${block.id}`} block={block} />
      )}
    </StyledBlockInventory>
  );
}

const StyledBlockInventory = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

export default BlockInventory;