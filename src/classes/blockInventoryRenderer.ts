import type Block from "./block";
import type Board from "./board";

import BlockRenderer from "./blockRenderer";
 
export default class BlockInventoryRenderer extends BlockRenderer {
  protected afterRenderBlock(block: Block): void {
    if (this.targetBoard) {
      const isUsable = this.targetBoard.getIsBlockUsable(block);
      this.setBlockUsable(block, isUsable);
    }

    this.bindClickEvent(block);
  }

  protected bindClickEvent(block: Block): void {
    const blockEl = this.getBlockEl(block);

    blockEl.addEventListener('click', () => {
      if (this.isActive(blockEl)) {
        this.unsetActive(blockEl);

        if (this.targetBoard && this.targetBoardRenderer) {
          this.targetBoardRenderer.clearHighlightUsableSlots(this.targetBoard);
        }

        return;
      }

      this.unsetAllActive();
      this.setActive(blockEl);

      if (this.targetBoard && this.targetBoardRenderer) {
        const usableCoords = this.targetBoard.getBlockUsableTopLeftCoords(block);

        this.targetBoardRenderer.highlightBlockUsableSlots({ 
          board: this.targetBoard,
          usableCoords: usableCoords, 
          tileCoords: block.tileCoords
        });
      }
    });
  }

  private isActive(blockEl: HTMLDivElement): boolean {
    return blockEl.classList.contains('active');
  }

  private setActive(blockEl: HTMLDivElement): void {
    blockEl.classList.add('active');
  }

  private unsetActive(blockEl: HTMLDivElement): void {
    blockEl.classList.remove('active');
  }

  private unsetAllActive(): void {
    this.el.querySelectorAll('.block.active').forEach(blockEl => {
      blockEl.classList.remove('active');
    });
  }
}