import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BoardEditorState {
  boardId: number | null,
  activeBlockId?: number | null,
}

const initialState: BoardEditorState = {
  boardId: null,
  activeBlockId: null,
}

const boardEditorSlice = createSlice({
  name: 'boardEditor',
  initialState: initialState,

  reducers: {
    setBoardId: (state, action: PayloadAction<number | null>) => {
      state.boardId = action.payload;
    },
  },
});

export const {
  setBoardId,
} = boardEditorSlice.actions;

export default boardEditorSlice;