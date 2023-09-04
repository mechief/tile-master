import { createSlice } from "@reduxjs/toolkit";

import type { BoardData } from "../classes/board";
import type { BlockData } from "../classes/block";

import { earnBoard, earnBlock } from "../actions/inventory";

export interface BoardsMap {
  [key: number | string]: BoardData;
}

export interface BlocksMap {
  [key: number | string]: BlockData;
}

interface InventoryState {
  boards: BoardsMap;
  blocks: BlocksMap;
}

const initialState: InventoryState = {
  boards: {},
  blocks: {},
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: initialState,

  reducers: {
    
  },
  extraReducers: (builder) => {builder
    .addCase(earnBoard.pending, (state, action) => {
    })
    .addCase(earnBoard.fulfilled, (state, { payload }) => {
      state.boards[payload.id] = { ...payload };
    })
    .addCase(earnBoard.rejected, (state, action) => {
    })

    .addCase(earnBlock.fulfilled, (state, { payload }) => {
      state.blocks[payload.id] = { ...payload };
    })
  }
});

export const {
} = inventorySlice.actions;

export default inventorySlice;