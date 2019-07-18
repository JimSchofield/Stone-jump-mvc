import '../styles/main.scss';

import Board from './Board/Board';
import BoardView from './Board/BoardView';
import constants from './constants';
import Controller from './Controller';
import Referee from './logic/Referee';
import Solver from './logic/Solver';
import { CartesianGeometry } from './logic/geometry';

const initialBoard = `
xx111xx
xx111xx
1111111
1110111
1111111
xx111xx
xx111xx
`;

// const initialBoard = `
// xx1xx
// x111x
// 11011
// x111x
// xx1xx
// `;

// Board setup
const board = Board.fromString(initialBoard);
const boardContainer = document.querySelector(constants.BOARD_CONTAINER) as HTMLElement;
const boardView = new BoardView(boardContainer, board);


const referee = new Referee(CartesianGeometry);
const controller = new Controller(boardContainer, boardView, referee);

setInterval(() => {
  console.log(window.iterationCount)
}, 5000);

Solver.solve(board, referee);