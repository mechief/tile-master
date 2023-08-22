import Board from "./classes/board";
import Block from "./classes/block";

const board = new Board();
const block = new Block();

const boardEl = document.getElementById('board')!;
const blockEl = document.getElementById('block')!;

board.renderBoard(boardEl);
block.renderBlock(blockEl)

console.log(block.tileMap);