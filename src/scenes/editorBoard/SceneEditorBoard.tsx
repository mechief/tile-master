import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useAppDispatch } from "../../store/store";

import Board from "../../classes/board";
import Block from "../../classes/block";
import { earnBlock } from "../../actions/inventory";
import { setBlockUsable } from "../../slices/inventorySlice";
import useInventoryBlocks from "../../hooks/useBlockInventory";
import type { BoardsMap } from "../../slices/inventorySlice";
import type { RootState } from "../../reducers";

import BoardEditor from "./BoardEditor";
import StatusWindow from "../../components/statusWindow/StatusWindow";
import BlockInventory from "../../components/inventory/BlockInventory";

const SceneEditorBoard = () => {
  const dispatch = useAppDispatch();

  const boards = useSelector<RootState, BoardsMap>(state => state.inventory.boards);
  const boardData = boards[Object.keys(boards)[0]];
  const board = useMemo(() => {
    return new Board({ data: boardData });
  }, [boardData]);
  
  const { blocks, blockInstances } = useInventoryBlocks();

  useEffect(() => {
    updateUsableBlocks();
  }, [board, blocks]);

  const updateUsableBlocks = () => {
    blockInstances.forEach(block => {
      const isUsable = board.isBlockUsable(block);
      if (blocks[block.id]?.editor?.isUsable !== isUsable) {
        dispatch(setBlockUsable({
          blockId: block.id,
          usable: isUsable
        }));
      }
    });
  }

  const handleBlockCreateButton = async () => {
    const newBlock = new Block();

    await dispatch(earnBlock(newBlock.getBlockData()));
  }
  
  return (
    <>
      <BoardEditorWithStatus>
        <BoardEditor board={board} />
        <StatusWindow />
      </BoardEditorWithStatus>
      <EditorBlockInventory>
        <InventoryTitle>블록</InventoryTitle>
        <button type="button" onClick={handleBlockCreateButton}>새로운 블록 생성</button>
        <button type="button" id="blockEquipButton">장착</button>
        <BlockInventory blocks={blockInstances} />
      </EditorBlockInventory>
    </>
  );
}

const BoardEditorWithStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const EditorBlockInventory = styled.div`
  margin-top: 30px;
  padding: 16px 24px;
  background: #f9f1e6;
`;

const InventoryTitle = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
`;

export default SceneEditorBoard;