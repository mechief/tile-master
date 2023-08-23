import Board from "./classes/board";
import BoardRenderer from "./classes/boardRenderer";
import Block from "./classes/block";
import BlockInventoryRenderer from "./classes/blockInventoryRenderer";

const board = new Board();
const block = new Block();

const currentBoardEl = document.getElementById('currentBoard')!;
const blockInventoryEl = document.getElementById('blockInventory')!;

const currentBoardRenderer = new BoardRenderer(currentBoardEl);
const blockInventoryRenderer = new BlockInventoryRenderer(blockInventoryEl);

currentBoardRenderer.initBoardRender(board);
blockInventoryRenderer.renderBlock({ block, targetBoard: board, targetBoardRenderer: currentBoardRenderer });

// board.equipBlock(block);

// 블록 생성 버튼
document.querySelector('#blockButton')?.addEventListener('click', () => {
  const _block = new Block();
  blockInventoryRenderer.renderBlock({ block: _block, targetBoard: board, targetBoardRenderer: currentBoardRenderer });
});