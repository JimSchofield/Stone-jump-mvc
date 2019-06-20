import Board from './models/Board';

const initialBoard = `
xx111xx
x11011x
xx111xx
`;

const board = Board.fromString(initialBoard);

board.prettyLog();

window['board'] = board;