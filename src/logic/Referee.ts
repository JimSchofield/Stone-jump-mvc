import Geometry from "./Geometry";
import MoveList, { Move } from "./MoveList";
import V2 from "../util/V2";
import Board from "../Board/Board";
import { Translation } from "./Translation";

export default class Referee {
    _geometry: Geometry
    constructor(geometry: Geometry) {
        this._geometry = geometry;
    }

    findMovesFrom(coords: V2, board: Board): MoveList {
        const legalMoves = new MoveList();

        this._geometry.translations
            .forEach((t: Translation) => {
                if (!board.getStoneRef(coords).isFilled) {
                    return;
                }

                const from = coords;
                const to = t(t(from));

                if (!this.moveIsValid({from, to}, board)) {
                    return;
                };

                // Whew, we made it and this move is legal:
                legalMoves.addMove({
                    from,
                    to,
                });
            });

        return legalMoves;
    }

    moveIsValid(move: Move, board:Board): boolean {
        // make sure moves are always a distance of two
        if (V2.distance(move.from, move.to) !== 2) {
            return false;
        }

        if (!board.getStoneRef(move.from).isFilled) {
            return false;
        }

        // make sure midpoint is in range and filled
        const mid = V2.midpoint(move.from, move.to);
        if (!(board.inBoardRange(mid) && board.getStoneRef(mid).isFilled)) {
            return false;
        }

        // check to make sure destination location is in range and not filled location
        // if so, valid move!
        const dest = move.to;
        if (!board.inBoardRange(dest)) {
            return false;
        }
        const destStoneRef = board.getStoneRef(dest)
        if (!(destStoneRef.isLocation && !destStoneRef.isFilled)) {
            return false;
        }

        return true;
    }
}