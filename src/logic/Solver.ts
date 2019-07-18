import Board from "../Board/Board";
import Referee from "./Referee";
import MoveList, { Move } from "./MoveList";
import Location from '../Board/Location';

export default class Solver {
  static listAllMoves(board: Board, referee: Referee): MoveList {
    let list = new MoveList();

    board.flatGrid.forEach((location: Location) => {
      list = MoveList.join(
        referee.findMovesFrom(location.v2, board),
        list
      );
    });

    return list;
  }

  static solve(board: Board, referee: Referee): void {
    window.iterationCount = window.iterationCount + 1 || 0;

    // find all possible moves
    const possibleMoves = this.listAllMoves(board, referee);

    // console.log('calculating...')

    // if possibleMoves length === 0 , log total left
    if (possibleMoves.length === 0 && board.countStonesLeft() === 1) {
      console.log(board.prettyLog());
    }

    // for each move, execute move
    possibleMoves._moveList.forEach((move: Move) => {
      if (window.iterationCount % 10000 === 0) {
        setTimeout(() => {
          Solver.solve(
            board.clone().moveStone(move),
            referee
          );
        }, 0);
      } else {
        Solver.solve(
          board.clone().moveStone(move),
          referee
        );
      }
    });
  }
}