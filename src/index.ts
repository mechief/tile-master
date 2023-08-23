import Board from "./classes/board";
import BoardEditorRenderer from "./classes/boardEditorRenderer";
import Block from "./classes/block";
import BlockInventoryRenderer from "./classes/blockInventoryRenderer";

const board = new Board();
const block = new Block();

const boardEditorEl = document.getElementById('boardEditor')!;
const blockInventoryEl = document.getElementById('blockInventory')!;

const boardEditorRenderer = new BoardEditorRenderer({ el: boardEditorEl, board: board });
const blockInventoryRenderer = new BlockInventoryRenderer(blockInventoryEl);

boardEditorRenderer.initBoardRender(board);
blockInventoryRenderer.renderBlock({ block, targetBoard: board, targetBoardRenderer: boardEditorRenderer });

// 블록 생성 버튼
document.querySelector('#blockButton')?.addEventListener('click', () => {
  const _block = new Block();
  blockInventoryRenderer.renderBlock({ block: _block, targetBoard: board, targetBoardRenderer: boardEditorRenderer });
});