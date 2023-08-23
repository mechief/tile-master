import Board from "./classes/board";
import BoardRenderer from "./classes/boardRenderer";
import Block from "./classes/block";
import BlockRenderer from "./classes/blockRenderer";

const board = new Board();
const block = new Block();

const boardEl = document.getElementById('board')!;
const blockInventoryEl = document.getElementById('blockInventory')!;

const blockInventoryRenderer = new BlockRenderer(blockInventoryEl);

BoardRenderer.renderBoard({ el: boardEl, board: board });
blockInventoryRenderer.renderBlock(block);

const usableCoords = board.getBlockUsableTopLeftCoords(block);
if (usableCoords.length > 0) {
  blockInventoryRenderer.setUsable(block);
}

BoardRenderer.highlightBlockUsableSlots({ 
  el: boardEl, 
  usableCoords: usableCoords, 
  tileCoords: block.tileCoords
});

// board.equipBlock(block);

// 블록 생성 버튼
document.querySelector('#blockButton')?.addEventListener('click', function() {
  const _block = new Block();
  blockInventoryRenderer.renderBlock(_block);

  const isUsable = board.getIsBlockUsable(_block);
  if (isUsable) {
    blockInventoryRenderer.setUsable(_block);
  }
});