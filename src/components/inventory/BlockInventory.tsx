import React, { useMemo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../reducers";

import Block from "../../classes/block";

import type { BlocksMap } from "../../slices/inventorySlice";

import BlockItem from "../block/BlockItem";

const BlockInventory = () => {
  const blocks = useSelector<RootState, BlocksMap>(state => state.inventory.blocks);

  const blockInstances = useMemo((): Block[] => [], []);

  const createInstances = useCallback(() => {
    // instance 가 생성되지 않았던 block 은 생성하여 저장
    const instanceIds = blockInstances.map(block => block.id);

    Object.keys(blocks).map(blockId => {
      const index = instanceIds.indexOf(+blockId);
      if (index !== -1) {
        instanceIds.splice(index, 1);
      } else {
        blockInstances.push(new Block({ data: blocks[blockId] }));
      }
    });

    // 없어진 block 은 참조 제거하여 instance delete
    instanceIds.forEach(blockId => {
      const index = blockInstances.findIndex(block => {
        return block.id === blockId;
      });

      blockInstances.splice(index, 1);
    });
  }, [blocks]);

  createInstances();

  return (
    <StyledBlockInventory>
      {blockInstances.map(block =>
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