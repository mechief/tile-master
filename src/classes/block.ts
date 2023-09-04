import { 
  TILE_EMPTY,
  TILE_FILLED,
  DEFAULT_BLOCK_TILE_COUNT 
} from "../constants/block";

export type TileState = typeof TILE_EMPTY | typeof TILE_FILLED;

interface BlockInitOption {
  tileCount?: number;
}

export interface BlockSize {
  rows: number,
  cols: number,
}

export interface TileCoordinate {
  row: number;
  col: number;
}

export interface BlockData {
  readonly id: number;
  
  readonly size: BlockSize;
  readonly tileCount: number;
  readonly tileMap: TileState[][];
  readonly tileCoords: TileCoordinate[];
  
  boardId?: number;
}

export default class Block {
  readonly id: number;
  
  readonly size: BlockSize;
  readonly tileCount: number;
  readonly tileMap: TileState[][];
  readonly tileCoords: TileCoordinate[];

  isUsable: boolean;
  
  boardId?: number;

  constructor({ data, option }: { data?: BlockData, option?: BlockInitOption } = {}) {
    if (data) {
      this.id = data.id;
      this.tileCount = data.tileCount;
      this.tileMap = data.tileMap;
      this.tileCoords = data.tileCoords;
      this.size = data.size;
    } else {
      this.id = new Date().getTime();
      this.tileCount = option?.tileCount || this.generateRandomTileCount();
  
      const { tileMap, tileCoords, size } = this.createTileMap();
      this.tileMap = tileMap;
      this.tileCoords = tileCoords;
      this.size = size;
    }

    this.isUsable = false;
  }

  public getBlockData(): BlockData {
    const data: BlockData = {
      id: this.id,
      size: this.size,
      tileCount: this.tileCount,
      tileMap: this.tileMap,
      tileCoords: this.tileCoords,
    };
    
    if (this.boardId) {
      data.boardId = this.boardId;
    }

    return data;
  }

  private generateRandomTileCount(): number {
    const { min, max } = DEFAULT_BLOCK_TILE_COUNT;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private createTileMap()
    : { tileMap: TileState[][], tileCoords: TileCoordinate[], size: BlockSize } {
    let tileCoords: TileCoordinate[] = [];
    
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

    tileCoords = tileCoords.map(tileCoord => {
      const newCoord: TileCoordinate = {
        row: tileCoord.row + minusRangeRow,
        col: tileCoord.col + minusRangeCol
      }
      tileMap[newCoord.row][newCoord.col] = TILE_FILLED;

      return newCoord;
    });

    const size = {
      rows: tileMap.length,
      cols: tileMap[0].length
    };

    return {
      tileMap,
      tileCoords,
      size
    };
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

  public getPositionState(position: TileCoordinate): TileState {
    return this.tileMap[position.row][position.col];
  }

  private checkIsInCoords(coords: TileCoordinate[], position: TileCoordinate): boolean {
    return coords.some(coord => {
      return coord.row === position.row && coord.col === position.col;
    });
  }

  public setUsable(usable: boolean): void {
    this.isUsable = usable;
  }

  /*
  public setBoardId(boardId: number): void {
    this.boardId = boardId;
  }
  */
}