import { 
  SLOT_CLOSED,
  SLOT_OPENED,
  DEFAULT_BOARD_SIZE,
  DEFAULT_BOARD_SLOT_COUNT
} from "../constants/board";

export type SlotState = typeof SLOT_CLOSED | typeof SLOT_OPENED;

export interface BoardSize {
  rows: number,
  cols: number,
}

interface BoardInitOption {
  size?: BoardSize,
  slotCount?: number,
}

interface BoardCoordinate {
  row: number;
  col: number;
}

export default class Board {
  boardId: number;
  size: BoardSize;
  slotCount: number;
  slotMap: SlotState[][];
  userId?: number;

  constructor(option?: BoardInitOption) {
    this.boardId = 1;
    this.size = option?.size || DEFAULT_BOARD_SIZE;
    this.slotCount = option?.slotCount || DEFAULT_BOARD_SLOT_COUNT;

    this.slotMap = this.createSlottedBoard();
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

  public renderBoard(el: HTMLElement): void {
    let html = '';
    const rows = this.slotMap.map(row => row.join(' '));
    
    rows.forEach(slotText => {
      html += slotText + '<br>';
    });

    el.innerHTML = html;
  }
}