import V2 from "../util/V2";

export class Move {
    from: V2;
    to: V2;

    constructor(from: V2, to: V2) {
        this.from = from;
        this.to = to;
    }

    clone() {
        return new Move(this.from.clone(), this.to.clone());
    }
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

    clone(): MoveList {
        return new MoveList(
            this._moveList.map((move: Move) => move.clone())
        );
    }

    static join(ml1: MoveList, ml2: MoveList): MoveList {
        return new MoveList(ml1.clone()._moveList.concat(ml2.clone()._moveList));
    }
}