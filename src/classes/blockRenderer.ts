import type Block from "./block";
import type Board from "./board";
import type BoardRenderer from "./boardRenderer";

interface BlockRenderData {
  readonly el: HTMLDivElement,
  isUsable?: boolean;
}

export default class BlockRenderer {
  protected el: HTMLElement;
  protected blockMap: { [key: string]: BlockRenderData }
  protected targetBoard?: Board;
  protected targetBoardRenderer?: BoardRenderer;

  constructor(el: HTMLElement) {
    this.el = el;
    this.blockMap = {};
  }

  public renderBlock(
    { block, targetBoard, targetBoardRenderer }
    : { block: Block, targetBoard?: Board, targetBoardRenderer?: BoardRenderer }
  ): void {
    this.createBlockElement(block);

    if (targetBoard) {
      this.targetBoard = targetBoard;
    }
    if (targetBoardRenderer) {
      this.targetBoardRenderer = targetBoardRenderer;
    }

    this.afterRenderBlock(block);
  }

  protected createBlockElement(block: Block): void {
    const blockHtml = block.tileMap.map(row => {
      const rowHtml = row.map(tileState => {
        return `<div class="cell">
          <div class="cell-inner" data-tile-state="${tileState}"></div>
        </div>`;
      });

      return `<div class="row">${rowHtml.join(' ')}</div>`;
    }).join('');

    const node = document.createElement('div');

    node.classList.add('block');
    node.setAttribute('data-block-id', String(block.id));
    node.innerHTML = blockHtml;

    this.setBlock(block, node);

    this.el.append(node);
  }
  
  private setBlock(block: Block, el: HTMLDivElement): void {
    this.blockMap[block.id] = { el };
  }

  protected getBlockEl(block: Block): HTMLDivElement {
    return this.blockMap[block.id].el;
  }

  protected isBlockUsable(block: Block): boolean {
    return this.blockMap[block.id].isUsable === true;
  }

  protected setBlockUsable(block: Block, isUsable: boolean): void {
    this.blockMap[block.id].isUsable = isUsable;

    if (isUsable) {
      this.getBlockEl(block).classList.add('usable');
    }
  }

  protected afterRenderBlock(block: Block): void {
  }
}