import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { BoardData } from "../classes/board";
import type { BlockData } from "../classes/block";

import { earnBoard, earnBlock } from "../actions/inventory";

export interface BoardsMap {
  [key: number | string]: BoardData;
}

export interface BlocksMap {
  [key: number | string]: {
    data: BlockData;
    editor?: EditorBlockStates
  }
}

interface EditorBlockStates {
  isUsable?: boolean;
}

interface InventoryState {
  boards: BoardsMap;
  blocks: BlocksMap;
}

interface BlockUsablePayload {
  blockId: number;
  usable: boolean;
}

const initialState: InventoryState = {
  boards: {},
  blocks: {},
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: initialState,

  reducers: {
    setBlockUsable: (state, action: PayloadAction<BlockUsablePayload>) => {
      state.blocks[action.payload.blockId].editor = {
        ...state.blocks[action.payload.blockId].editor, 
        isUsable: action.payload.usable
      }
    }
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
      state.blocks[payload.id] = { data: { ...payload } };
    })
  }
});

export const {
  setBlockUsable
} = inventorySlice.actions;

export default inventorySlice;