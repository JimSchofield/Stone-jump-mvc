import V2 from "../util/V2";

export interface Move {
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

    get length() {
        return this._moveList.length;
    }

    addMove(move: Move): void {
        this._moveList.push(move);
    }

    map(func: (move: Move) => any): any[] {
        return this._moveList.map(func);
    }
}