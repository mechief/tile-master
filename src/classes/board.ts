import type Block from "./block";
import type { TileCoordinate } from "./block";

import BoardSlotGenerator from "./boardSlotGenerator";

import { randomId } from "../utils/uniqueId";

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
  readonly rows: number,
  readonly cols: number,
}

export interface BoardCoordinate {
  row: number,
  col: number,
}

interface BlockEquipmentState {
  block: Block,
  position: BoardCoordinate,
}

export interface BoardNewData {
  code: string;

  size: BoardSize;
  slotCount: number;
  slotMap: SlotState[][];

  equipedBlocks: BlockEquipmentState[];
}

export interface BoardData extends BoardNewData {
  id?: number;
  userId?: number;
}

export default class Board {
  public readonly id?: number;
  public readonly code: string;

  public readonly size: BoardSize;
  private readonly slotCount: number;
  public readonly slotMap: SlotState[][];

  private equipedBlocks: BlockEquipmentState[];
  
  private userId?: number;

  constructor({ data, option }: { data?: BoardData, option?: BoardInitOption } = {}) {
    // 기존 데이터로 instance 생성
    if (data) {
      this.id = data.id;
      this.code = data.code;
      this.size = data.size;
      this.slotCount = data.slotCount;
      this.slotMap = data.slotMap;
      this.equipedBlocks = data.equipedBlocks;
      this.userId = data.userId;

      return;
    } else {
      // 새로운 board instance 생성
      this.code = randomId(8);
      this.size = option?.size || DEFAULT_BOARD_SIZE;
      this.slotCount = option?.slotCount || DEFAULT_BOARD_SLOT_COUNT;
  
      this.slotMap = BoardSlotGenerator.createSlottedBoard({ size: this.size, slotCount: this.slotCount });
  
      this.equipedBlocks = [];
    }
  }

  public getNewBoardData(): BoardNewData {
    return {
      code: this.code,
      size: this.size,
      slotCount: this.slotCount,
      slotMap: this.slotMap,
      equipedBlocks: this.equipedBlocks,
    }
  }

  public getBoardData(): BoardData {
    const data: BoardData = {...this.getNewBoardData()};
    
    if (this.id) {
      data.id = this.id;
    }
    if (this.userId) {
      data.userId = this.userId;
    }

    return data;
  }

  public getStateOfPosition(position: BoardCoordinate): SlotState {
    return this.slotMap[position.row][position.col];
  }

  public isPositionSlotted(position: BoardCoordinate, slotMap?: SlotState[][]): boolean {
    const _slotMap = slotMap ?? this.slotMap;

    return _slotMap[position.row][position.col] !== SLOT_CLOSED;
  }

  // 슬롯이 열려있는 빈 칸인지 확인
  public isPositionOpened(position: BoardCoordinate, slotMap?: SlotState[][]): boolean {
    const _slotMap = slotMap ?? this.slotMap;

    return _slotMap[position.row][position.col] === SLOT_OPENED;
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

  // 블록을 장착 가능한지 확인 (슬롯 열림 및 다른 블록과 충돌 없는지 확인)
  public isBlockEquippableAtPosition(
    { tileCoords, position }
    : { tileCoords: TileCoordinate[], position: BoardCoordinate }
  ): boolean {
    let isUsable = true;

    for (const tileCoord of tileCoords) {
      const isOpened = this.isPositionOpened({
        row: position.row + tileCoord.row,
        col: position.col + tileCoord.col,
      });

      if (!isOpened) {
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

  public equipBlock({ block, position }: { block: Block, position: BoardCoordinate }): boolean {
    if (this.checkIsBlockEquiped(block) 
      || !this.isBlockEquippableAtPosition({ tileCoords: block.tileCoords, position: position })) {
      return false;
    }

    this.updateSlotMap({ block, position });
    this.equipedBlocks.push({ block, position });
    
    // block.setBoardId(this.id);

    return true;
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