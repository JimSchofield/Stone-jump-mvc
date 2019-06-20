import Location from './Location';

export default class Board {
    private _grid: Location[][] = [];

    constructor(grid: Location[][]) {
        this._grid = grid;
    }

    static fromString(string: string): Board | any {
        return new Board(string.trim().split('\n')
            .map((rowString: string) => rowString.trim().split(''))
            .map((row: string[], y: number) => 
                row.map((col: string, x: number) => {
                    return Location.fromString(x,y,col);
                })));
    }

    prettyLog(): void {
        console.log("Board:");
        console.log(
            this._grid.map(row => (
                row.map(col => {
                    if (col.isFilled) {
                        return "1";
                    }
                    if (col.isLocation) {
                        return "0"
                    }
                    return "x";
                }).join("")
            )).join("\n")
        )
    }
}