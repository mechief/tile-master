import type Block from "./block";
 
export default class BlockRenderer {
  el: HTMLElement;
  blockElMap: { [key: number]: HTMLDivElement }

  constructor(el: HTMLElement) {
    this.el = el;
    this.blockElMap = {};
  }

  public renderBlock(block: Block): void {
    const rowsHtml = block.tileMap.map(row => {
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
    node.innerHTML = rowsHtml;

    this.blockElMap[block.id] = node;

    this.el.append(node);
  }

  public setUsable(block: Block): void {
    this.blockElMap[block.id].classList.add('usable');
  }
}