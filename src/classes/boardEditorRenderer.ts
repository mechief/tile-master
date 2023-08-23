import type Board from "./board";
import type Block from "./block";
import type { BoardCoordinate } from "./board";

import BoardRenderer from "./boardRenderer";

type BoardEditorMode = 'default' | 'equipment';

export default class BoardEditorRenderer extends BoardRenderer {
  mode: BoardEditorMode;
  board: Board;
  currentBlock?: Block;
  usableCoords?: BoardCoordinate[];

  constructor({ el, board }: { el: HTMLElement, board: Board }) {    
    super(el);

    this.mode = 'default';
    this.board = board;
  }

  public setModeDefault(): void {
    this.mode = 'default';
    this.el.classList.remove('mode-equipment');
  }

  public setModeEquipment(block: Block): void {
    this.mode = 'equipment';
    this.el.classList.add('mode-equipment');
    
    this.currentBlock = block;
    this.usableCoords = this.board.getBlockUsableTopLeftCoords(this.currentBlock);

    this.bindEquipEvent();
  }

  private bindEquipEvent(): void {
    this.el.addEventListener('click', (e) => {
      e.preventDefault();

      if (!this.currentBlock) {
        return;
      }

      if (e.target instanceof Element) {
        const row = e.target.getAttribute('data-row');
        const col = e.target.getAttribute('data-col');

        if (row === null || col === null) {
          return;
        }

        const position = { row: +row, col: +col };

        const isUsable = this.usableCoords?.some(coord => {
          return coord.row === position.row && coord.col === position.col;
        });

        if (isUsable) {
          this.board.equipBlock({ block: this.currentBlock, position: position });
          this.updateSlotStates(this.board);
          this.setModeDefault();
        }
      }
    });
  }
}