import type Block from "./block";

import { 
  SLOT_CLOSED,
  SLOT_OPENED,
  DEFAULT_BOARD_SIZE,
  DEFAULT_BOARD_SLOT_COUNT
} from "../constants/board";
import { TileCoordinate } from "./block";

export type SlotState = typeof SLOT_CLOSED | typeof SLOT_OPENED;

interface BoardInitOption {
  size?: BoardSize,
  slotCount?: number,
}

export interface BoardSize {
  rows: number,
  cols: number,
}

export interface BoardCoordinate {
  row: number;
  col: number;
}

export default class Board {
  readonly id: number;

  readonly size: BoardSize;
  readonly slotCount: number;
  readonly slotMap: SlotState[][];

  blocks: Block[];
  
  userId?: number;

  constructor(option?: BoardInitOption) {
    this.id = 1;
    this.size = option?.size || DEFAULT_BOARD_SIZE;
    this.slotCount = option?.slotCount || DEFAULT_BOARD_SLOT_COUNT;

    this.slotMap = this.createSlottedBoard();

    this.blocks = [];
  }

  private createSlottedBoard(): SlotState[][] {
    const _slotMap: SlotState[][] = Array.from({ length: this.size.rows }, () =>
      Array.from({ length: this.size.cols }, () => SLOT_CLOSED)
    );
    
    let slottedCount = 0;

    const initialPosition: BoardCoordinate = { // 랜덤한 시작 지점
      row: Math.floor(Math.random() * this.size.rows), 
      col: Math.floor(Math.random() * this.size.cols)
    };
    let position = initialPosition;

    while (this.slotCount > slottedCount) {
      _slotMap[position.row][position.col] = SLOT_OPENED;
      slottedCount++;

      let availablePositions: BoardCoordinate[] = this.findAvailablePositions(_slotMap, position);

      while (availablePositions.length === 0) {
        position = this.pickRandomSlottedPosition(_slotMap);
        availablePositions = this.findAvailablePositions(_slotMap, position);
      }

      const newPositionIndex = Math.floor(Math.random() * availablePositions.length);
      position = availablePositions[newPositionIndex];
    }

    return _slotMap;
  }

  private findAvailablePositions(slotMap: SlotState[][], position: BoardCoordinate): BoardCoordinate[] {
    const nearPositions: BoardCoordinate[] = [];

    if (position.row > 0) {
      nearPositions.push({
        ...position,
        row: position.row - 1
      });
    }
    if (position.row < this.size.rows - 1) {
      nearPositions.push({
        ...position,
        row: position.row + 1,
      });
    }
    if (position.col > 0) {
      nearPositions.push({
        ...position,
        col: position.col - 1
      });
    }
    if (position.col < this.size.cols - 1) {
      nearPositions.push({
        ...position,
        col: position.col + 1
      });
    }

    const availablePositions: BoardCoordinate[] = [];
    nearPositions.forEach(position => {
      if (!this.getIsPositionSlotted(slotMap, position)) {
        availablePositions.push(position);
      }
    });

    return availablePositions;
  }

  private getIsPositionSlotted(slotMap: SlotState[][], position: BoardCoordinate): boolean {
    return slotMap[position.row][position.col] === SLOT_OPENED;
  }

  private checkIsBlockUsableAtPosition(
    { tileCoords, position }
    : { tileCoords: TileCoordinate[], position: BoardCoordinate }
  ): boolean {
    let isUsable = true;

    for (const tileCoord of tileCoords) {
      const isSlotted = this.getIsPositionSlotted(this.slotMap, {
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

  private pickRandomSlottedPosition(slotMap: SlotState[][]): BoardCoordinate {
    const slottedPosition: BoardCoordinate[] = [];

    for (let row = 0; row < this.size.rows; row++) {
      for (let col = 0; col < this.size.cols; col++) {
        if (slotMap[row][col] === SLOT_OPENED) {
          slottedPosition.push({ row, col });
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * slottedPosition.length);
    return slottedPosition[randomIndex];
  }

  // 블록이 보드에 장착 가능한 모양인지 체크
  public getIsBlockUsable(block: Block): boolean {
    const tileCoords = block.tileCoords;

    // 타일 그리드의 좌상단 좌표 기준 타일이 넘치지 않는 영역
    const maxRowIndex = this.size.rows - block.size.rows;
    const maxColIndex = this.size.cols - block.size.cols;

    // slotMap의 좌표를 순회하며 해당 좌표가 타일 그리드의 좌상단일 때에 장착 가능한지 확인
    for (let row = 0; row <= maxRowIndex; row++) {
      for (let col = 0; col <= maxColIndex; col++) {
        const position: BoardCoordinate = { row, col };

        const isUsable = this.checkIsBlockUsableAtPosition({ tileCoords, position });
        if (isUsable) {
          return true;
        }
      }
    }

    return false;
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

        const isUsable = this.checkIsBlockUsableAtPosition({ tileCoords, position });
        if (isUsable) {
          coords.push(position);
        }
      }
    }

    return coords;
  }

  private checkIsBlockEquiped(block: Block): boolean {
    return this.blocks.some(equipedBlock => equipedBlock.id === block.id);
  }

  public equipBlock(block: Block): void {
    if (this.checkIsBlockEquiped(block)) {
      return;
    }

    block.setBoardId(this.id);
    this.blocks.push(block);
  }
}