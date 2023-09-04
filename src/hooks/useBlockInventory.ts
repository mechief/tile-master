import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

import Block from "../classes/block";

import type { BlocksMap } from "../slices/inventorySlice"

const useInventoryBlocks = () => {
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
        blockInstances.push(new Block({ data: blocks[blockId].data }));
      }
    });

    deleteInstances(instanceIds);
  }, [blocks]);

  const deleteInstances = (instanceIds: number[]) => {
    instanceIds.forEach(blockId => {
      const index = blockInstances.findIndex(block => {
        return block.id === blockId;
      });

      blockInstances.splice(index, 1);
    });
  }

  createInstances();

  return {
    blocks: blocks,
    blockInstances: blockInstances,
  }
}

export default useInventoryBlocks;