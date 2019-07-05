import V2 from "../util/V2";

interface Move {
    from: V2;
    to: V2;
}

export default class MoveList {
    _moveList: Move[] = [];

    constructor(moveList?: Move[]) {
        if (moveList && moveList.length) {
            this._moveList = moveList;
        }
    }

    addMove(move: Move): void {
        this._moveList.push(move);
    }
}