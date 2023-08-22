import type Board from "./board";
import type { BoardCoordinate } from "./board";
import type { TileCoordinate } from "./block";
 
export default class BoardRenderer {
  static renderBoard({ el, board }: { el: HTMLElement, board: Board }): void {
    const html = board.slotMap.map(row => {
      const rowHtml = row.map(slotState => `<span>${slotState}</span>`);
      return `<div>${rowHtml.join(' ')}</div>`;
    }).join('');
    
    el.innerHTML = html;
  }

  // 블록을 장착 가능한 보드 슬롯을 하이라이트
  static highlightBlockUsableSlots({ el, usableCoords, tileCoords }: { el: HTMLElement, usableCoords: BoardCoordinate[], tileCoords: TileCoordinate[] }): void {
    const rows = el.children;

    usableCoords.forEach(usableCoord => {
      tileCoords.forEach(tileCoord => {
        const highlightCoord = {
          row: usableCoord.row + tileCoord.row,
          col: usableCoord.col + tileCoord.col,
        }

        const cols = rows[highlightCoord.row].children;
        cols[highlightCoord.col].classList.add('usable');
      });
    });
  }
}