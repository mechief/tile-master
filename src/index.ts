import Board from "./classes/board";
import BoardRenderer from "./classes/boardRenderer";
import Block from "./classes/block";

const board = new Board();
const block = new Block();

const boardEl = document.getElementById('board');
const blockEl = document.getElementById('block');

if (boardEl) {
  BoardRenderer.renderBoard({ el: boardEl, board: board });

  const usableCoords = board.getBlockUsableTopLeftCoords(block);
  BoardRenderer.highlightBlockUsableSlots({ 
    el: boardEl, 
    usableCoords: usableCoords, 
    tileCoords: block.tileCoords
  });
}
if (blockEl) {
  block.renderBlock(blockEl);
}