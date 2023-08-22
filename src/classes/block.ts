import type { SlotState } from "./board";

import { 
  TILE_EMPTY,
  TILE_FILLED,
  DEFAULT_BLOCK_TILE_COUNT 
} from "../constants/block";

type TileState = typeof TILE_EMPTY | typeof TILE_FILLED;

interface BlockInitOption {
  tileCount?: number;
}

interface TileCoordinate {
  row: number;
  col: number;
}

export default class Block {
  blockId: number;
  boardId?: number;
  tileCount: number;
  tileMap: TileState[][];

  constructor(option?: BlockInitOption) {
    this.blockId = 1;
    this.tileCount = option?.tileCount || this.generateRandomTileCount();

    this.tileMap = this.createTileMap();
  }

  private generateRandomTileCount(): number {
    const { min, max } = DEFAULT_BLOCK_TILE_COUNT;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private createTileMap(): TileState[][] {
    const tileCoords: TileCoordinate[] = [];
    
    let _tileCount = 0;
    let position: TileCoordinate = { row: 0, col: 0 };
    let [minRow, maxRow, minCol, maxCol] = [0, 0, 0, 0];
    
    while (this.tileCount > _tileCount) {
      tileCoords.push({ ...position });
      _tileCount++;

      minRow = Math.min(position.row, minRow);
      maxRow = Math.max(position.row, maxRow);
      minCol = Math.min(position.col, minCol);
      maxCol = Math.max(position.col, maxCol);

      let newPosition = this.getNewTilePosition(position);
      
      while (this.checkIsInCoords(tileCoords, newPosition)) {
        newPosition = this.getNewTilePosition(position); 
      }

      position = { ...newPosition };
    }

    // 좌상단이 row: 0, col: 0 이 되도록 음수 좌표를 보정하여 tileMap 을 생성한다.
    const minusRangeCol = Math.abs(0 - minCol);
    const minusRangeRow = Math.abs(0 - minRow);

    const tileMap: TileState[][] = Array.from({ length: maxRow + minusRangeRow + 1 }, () =>
      Array.from({ length: maxCol + minusRangeCol + 1 }, () => TILE_EMPTY)
    );

    tileCoords.forEach(tileCoord => {
      tileMap[tileCoord.row + minusRangeRow][tileCoord.col + minusRangeCol] = TILE_FILLED;
    });

    return tileMap;
  }

  private getNewTilePosition(currentPosition: TileCoordinate): TileCoordinate {
    const directions = ["up", "down", "left", "right"] as const;
    const randomDirection: typeof directions[number] = directions[Math.floor(Math.random() * directions.length)];

    let newPosition: TileCoordinate;
    switch (randomDirection) {
      case "up":
        newPosition = { ...currentPosition, row: currentPosition.row - 1 };
        break;
      case "down":
        newPosition = { ...currentPosition, row: currentPosition.row + 1 };
        break;
      case "left":
        newPosition = { ...currentPosition, col: currentPosition.col - 1 };
        break;
      case "right":
        newPosition = { ...currentPosition, col: currentPosition.col + 1 };
        break;
    }

    return newPosition;
  }

  private checkIsInCoords(coords: TileCoordinate[], position: TileCoordinate): boolean {
    return coords.some(coord => {
      return coord.row === position.row && coord.col === position.col;
    });
  }

  public renderBlock(el: HTMLElement): void {
    let html = '';
    const rows = this.tileMap.map(row => row.join(' '));
    
    rows.forEach(slotText => {
      html += slotText + '<br>';
    });

    el.innerHTML = html;
  }

  static checkIsBlockUsableAtBoard(slotMap: SlotState[][], tileMap: TileState[][]): boolean {
    for(let row = 0; row < slotMap.length; row++) {

    }

    return true;
  }
}