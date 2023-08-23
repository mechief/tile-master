import type Block from "./block";
import type BoardEditorRenderer from "./boardEditorRenderer";

import BlockRenderer from "./blockRenderer";

import { 
  SLOT_CLOSED,
  SLOT_OPENED,
  SLOT_EQUIPED
} from "../constants/board";
 
export default class BlockInventoryRenderer extends BlockRenderer {
  protected targetBoardRenderer?: BoardEditorRenderer;

  protected afterRenderBlock(block: Block): void {
    if (this.targetBoard) {
      const isUsable = this.targetBoard.isBlockUsable(block);
      this.setBlockUsable(block, isUsable);
    }

    this.bindClickEvent(block);
  }

  protected bindClickEvent(block: Block): void {
    const blockEl = this.getBlockEl(block);

    blockEl.addEventListener('click', () => {
      if (this.targetBoard && this.targetBoardRenderer) {
        this.targetBoardRenderer.clearHighlightUsableSlots(this.targetBoard);
      }

      const equipButton: HTMLElement = document.querySelector('#blockEquipButton')!;
      equipButton.style.display = 'none';

      if (this.isActive(blockEl)) {
        this.unsetActive(blockEl);
        return;
      }

      this.unsetAllActive();
      this.setActive(blockEl);

      if (this.targetBoard && this.targetBoardRenderer) {
        const isUsable = this.isBlockUsable(block);

        if (!isUsable) {
          return;
        }
        
        equipButton.style.display = 'inline-block';
        equipButton.addEventListener('click', () => {
          this.handleEquipButton(block);
        });

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

  private handleEquipButton(block: Block): void {
    this.targetBoardRenderer?.setModeEquipment(block);
  }
}