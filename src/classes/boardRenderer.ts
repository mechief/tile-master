import type Board from "./board";
import type { BoardCoordinate } from "./board";
import type { TileCoordinate } from "./block";
 
export default class BoardRenderer {
  protected el: HTMLElement;
  protected boardElMap: { [key: string]: HTMLDivElement }

  constructor(el: HTMLElement) {
    this.el = el;
    this.boardElMap = {};
  }

  public initBoardRender(board: Board): void {
    this.renderBoard(board);
  }
  
  private renderBoard(board: Board): void {
    const boardHtml = board.slotMap.map((rowArray, row) => {
      const rowHtml = rowArray.map((slotState, col) => {
        return `<div class="cell">
          <div class="cell-inner" data-row="${row}" data-col="${col}" data-slot-state="${slotState}"></div>
        </div>`;
      });

      return `<div class="row">${rowHtml.join(' ')}</div>`;
    }).join('');
    
    const node = document.createElement('div');

    node.classList.add('board');
    node.setAttribute('data-board-id', String(board.id));
    node.innerHTML = boardHtml;

    this.setBoardEl(board, node);

    this.el.append(node);
  }

  protected getBoardEl(board: Board): HTMLDivElement {
    return this.boardElMap[board.id];
  }

  private setBoardEl(board: Board, el: HTMLDivElement): void {
    this.boardElMap[board.id] = el;
  }

  // 블록을 장착 가능한 보드 슬롯을 하이라이트
  public highlightBlockUsableSlots(
    { board, usableCoords, tileCoords }
    : { board: Board, usableCoords: BoardCoordinate[], tileCoords: TileCoordinate[] }
  ): void {
    const boardEl = this.getBoardEl(board);

    const rows = boardEl.children;

    usableCoords.forEach(usableCoord => {
      tileCoords.forEach(tileCoord => {
        const highlightSlotCoord: BoardCoordinate = {
          row: usableCoord.row + tileCoord.row,
          col: usableCoord.col + tileCoord.col,
        }

        const cols = rows[highlightSlotCoord.row].children;
        cols[highlightSlotCoord.col].children[0].classList.add('usable');
      });
    });
  }

  public clearHighlightUsableSlots(board: Board): void {
    const boardEl = this.getBoardEl(board);
    
    boardEl.querySelectorAll('.cell-inner.usable').forEach(cell => {
      cell.classList.remove('usable');
    });
  }

  protected updateSlotStates(board: Board): void {
    const boardEl = this.getBoardEl(board);
    const rows = boardEl.children;

    for (let row = 0; row < rows.length; row++) {
      const cols = rows[row].children;
      for (let col = 0; col < cols.length; col++) {
        const cellInnerEl = cols[col].children[0];
        cellInnerEl.setAttribute('data-slot-state', ''+board.slotMap[row][col]);
      }
    }
  }
}