import '../styles/main.scss';

import Board from './Board/Board';
import BoardView from './Board/BoardView';
import constants from './constants';

const initialBoard = `
xx111xx
x11011x
xx111xx
`;

const board = Board.fromString(initialBoard);
const boardContainer = document.querySelector(constants.BOARD_CONTAINER) as HTMLElement;
const boardView = new BoardView(boardContainer, board);

board.prettyLog();

console.log(board.grid[1][3])
