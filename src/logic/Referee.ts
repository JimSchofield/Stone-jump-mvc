import Geometry from "./Geometry";
import MoveList from "./MoveList";
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

                // make sure midpoint is in range and filled
                const mid = t(coords);
                if (!(board.inBoardRange(mid) && board.getStoneRef(mid).isFilled)) {
                    return;
                }

                // check to make sure destination location is in range
                // if so, valid move!
                const dest = t(mid);
                if (!board.inBoardRange(dest) || board.getStoneRef(dest).isFilled) {
                    return;
                }

                console.log(dest);
                
            })

        return legalMoves;
    }
}