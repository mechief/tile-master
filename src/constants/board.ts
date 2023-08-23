import type { BoardSize } from "../classes/board";

export const SLOT_CLOSED = -1;
export const SLOT_OPENED = 0;
export const SLOT_EQUIPED = 1;

export const DEFAULT_BOARD_SIZE: BoardSize = { rows: 6, cols: 6 };
export const DEFAULT_BOARD_SLOT_COUNT = 16;