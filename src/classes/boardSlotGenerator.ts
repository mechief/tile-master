import type {
  SlotState,
  BoardInitOption, 
  BoardSize,
  BoardCoordinate,
} from './board';

import { 
  SLOT_CLOSED,
  SLOT_OPENED,
} from "../constants/board";

export default class BoardSlotGenerator {
  static createSlottedBoard(option: Required<BoardInitOption>): SlotState[][] {
    const _slotMap: SlotState[][] = Array.from({ length: option.size.rows }, () =>
      Array.from({ length: option.size.cols }, () => SLOT_CLOSED)
    );
    
    let slottedCount = 0;

    const initialPosition: BoardCoordinate = { // 랜덤한 시작 지점
      row: Math.floor(Math.random() * option.size.rows), 
      col: Math.floor(Math.random() * option.size.cols)
    };
    let position = initialPosition;

    while (option.slotCount > slottedCount) {
      _slotMap[position.row][position.col] = SLOT_OPENED;
      slottedCount++;

      let availablePositions: BoardCoordinate[] = BoardSlotGenerator.findAvailablePositions({ slotMap:_slotMap, position, size: option.size });

      while (availablePositions.length === 0) {
        position = BoardSlotGenerator.pickRandomSlottedPosition({ slotMap: _slotMap, size: option.size });
        availablePositions = BoardSlotGenerator.findAvailablePositions({ slotMap:_slotMap, position, size: option.size });
      }

      const newPositionIndex = Math.floor(Math.random() * availablePositions.length);
      position = availablePositions[newPositionIndex];
    }

    return _slotMap;
  }

  static findAvailablePositions(
    { slotMap, position, size }
    : { slotMap: SlotState[][], position: BoardCoordinate, size: BoardSize }
  ): BoardCoordinate[] {
    const nearPositions: BoardCoordinate[] = [];

    if (position.row > 0) {
      nearPositions.push({
        ...position,
        row: position.row - 1
      });
    }
    if (position.row < size.rows - 1) {
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
    if (position.col < size.cols - 1) {
      nearPositions.push({
        ...position,
        col: position.col + 1
      });
    }

    const availablePositions: BoardCoordinate[] = [];
    nearPositions.forEach(position => {
      if (!this.isPositionSlotted(position, slotMap)) {
        availablePositions.push(position);
      }
    });

    return availablePositions;
  }

  static isPositionSlotted(position: BoardCoordinate, slotMap: SlotState[][]): boolean {
    return slotMap[position.row][position.col] !== SLOT_CLOSED;
  }
  
  static pickRandomSlottedPosition(
    { slotMap, size }
    : { slotMap: SlotState[][], size: BoardSize }
  ): BoardCoordinate {
    const slottedPosition: BoardCoordinate[] = [];

    for (let row = 0; row < size.rows; row++) {
      for (let col = 0; col < size.cols; col++) {
        if (slotMap[row][col] !== SLOT_CLOSED) {
          slottedPosition.push({ row, col });
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * slottedPosition.length);
    return slottedPosition[randomIndex];
  }
}