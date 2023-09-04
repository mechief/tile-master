import { createAsyncThunk } from "@reduxjs/toolkit";

import type { BoardNewData, BoardData } from "../classes/board";
import type { BlockData } from "../classes/block";

let boardId = 1;

export const earnBoard = createAsyncThunk<Required<BoardData>, BoardNewData>(
  'inventory/earnBoard', 
  async (data: BoardNewData) => {
    // 서버와의 비동기 통신 - 등록 작업 진행
    const response = {
      id: boardId++,
      userId: 1,
    };

    const boardData: Required<BoardData> = { ...data, ...response };
    
    return boardData;
  }
);

export const earnBlock = createAsyncThunk<BlockData, BlockData>(
  'inventory/earnBlock', 
  async (data: BlockData) => {
    // 서버와의 비동기 통신 - 등록 작업 진행

    const BlockData: BlockData = { ...data };
    
    return BlockData;
  }
);