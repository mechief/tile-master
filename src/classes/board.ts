import type Block from "./block";
import type { TileCoordinate } from "./block";

import BoardSlotGenerator from "./boardSlotGenerator";

import { 
  SLOT_CLOSED,
  SLOT_OPENED,
  SLOT_EQUIPED,
  DEFAULT_BOARD_SIZE,
  DEFAULT_BOARD_SLOT_COUNT
} from "../constants/board";

export type SlotState = typeof SLOT_CLOSED | typeof SLOT_OPENED | typeof SLOT_EQUIPED;

export interface BoardInitOption {
  size?: BoardSize,
  slotCount?: number,
}

export interface BoardSize {
  rows: number,
  cols: number,
}

export interface BoardCoordinate {
  row: number,
  col: number,
}

interface BlockEquipmentState {
  block: Block,
  position: BoardCoordinate,
}

export default class Board {
  public readonly id: number;

  private readonly size: BoardSize;
  private readonly slotCount: number;
  public readonly slotMap: SlotState[][];

  private equipedBlocks: BlockEquipmentState[];
  
  private userId?: number;

  constructor(option?: BoardInitOption) {
    this.id = 1;
    this.size = option?.size || DEFAULT_BOARD_SIZE;
    this.slotCount = option?.slotCount || DEFAULT_BOARD_SLOT_COUNT;

    this.slotMap = BoardSlotGenerator.createSlottedBoard({ size: this.size, slotCount: this.slotCount });

    this.equipedBlocks = [];
  }

  public isPositionSlotted(position: BoardCoordinate, slotMap?: SlotState[][]): boolean {
    if (slotMap) {
      return slotMap[position.row][position.col] !== SLOT_CLOSED;
    }

    return this.slotMap [position.row][position.col] !== SLOT_CLOSED;
  }

  // 블록이 보드에 장착 가능한 모양인지 체크
  public isBlockUsable(block: Block): boolean {
    const tileCoords = block.tileCoords;

    // 타일 그리드의 좌상단 좌표 기준 타일이 넘치지 않는 영역
    const maxRowIndex = this.size.rows - block.size.rows;
    const maxColIndex = this.size.cols - block.size.cols;

    // slotMap의 좌표를 순회하며 해당 좌표가 타일 그리드의 좌상단일 때에 장착 가능한지 확인
    for (let row = 0; row <= maxRowIndex; row++) {
      for (let col = 0; col <= maxColIndex; col++) {
        const position: BoardCoordinate = { row, col };

        const isUsable = this.isBlockUsableAtPosition({ tileCoords, position });
        if (isUsable) {
          return true;
        }
      }
    }

    return false;
  }

  public isBlockUsableAtPosition(
    { tileCoords, position }
    : { tileCoords: TileCoordinate[], position: BoardCoordinate }
  ): boolean {
    let isUsable = true;

    for (const tileCoord of tileCoords) {
      const isSlotted = this.isPositionSlotted({
        row: position.row + tileCoord.row,
        col: position.col + tileCoord.col,
      });

      if (!isSlotted) {
        isUsable = false;
        break;
      }
    }

    return isUsable;
  }

  // 블록이 보드에 장착 가능한 전체 위치 가져오기
  public getBlockUsableTopLeftCoords(block: Block): BoardCoordinate[] {
    const coords: BoardCoordinate[] = [];
    
    const tileCoords = block.tileCoords;

    // 타일 그리드의 좌상단 좌표 기준 타일이 넘치지 않는 영역
    const maxRowIndex = this.size.rows - block.size.rows;
    const maxColIndex = this.size.cols - block.size.cols;

    // slotMap의 좌표를 순회하며 해당 좌표가 타일 그리드의 좌상단일 때에 장착 가능한지 확인
    for (let row = 0; row <= maxRowIndex; row++) {
      for (let col = 0; col <= maxColIndex; col++) {
        const position: BoardCoordinate = { row, col };

        const isUsable = this.isBlockUsableAtPosition({ tileCoords, position });
        if (isUsable) {
          coords.push(position);
        }
      }
    }

    return coords;
  }

  private checkIsBlockEquiped(block: Block): boolean {
    return this.equipedBlocks.some(equipedBlock => equipedBlock.block.id === block.id);
  }

  public equipBlock({ block, position }: { block: Block, position: BoardCoordinate }): void {
    if (this.checkIsBlockEquiped(block)) {
      return;
    }

    this.updateSlotMap({ block, position });
    this.equipedBlocks.push({ block, position });
    
    block.setBoardId(this.id);
  }

  private updateSlotMap({ block, position }: { block: Block, position: BoardCoordinate }): void {
    block.tileCoords.forEach(coord => {
      const slotPosition: BoardCoordinate = {
        row: position.row + coord.row,
        col: position.col + coord.col,
      }
      this.slotMap[slotPosition.row][slotPosition.col] = SLOT_EQUIPED;
    });
  }
}