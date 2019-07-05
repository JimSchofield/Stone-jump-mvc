import '../styles/main.scss';

import Board from './Board/Board';
import BoardView from './Board/BoardView';
import constants from './constants';
import Controller from './Controller';
import Referee from './logic/Referee';
import { CartesianGeometry } from './logic/geometry';

const initialBoard = `
xx111xx
x11011x
xx111xx
xxx1111
`;

// Board setup
const board = Board.fromString(initialBoard);
const boardContainer = document.querySelector(constants.BOARD_CONTAINER) as HTMLElement;
const boardView = new BoardView(boardContainer, board);

// Move refereeing
const referee = new Referee(CartesianGeometry);

const controller = new Controller(boardContainer, boardView, referee);
