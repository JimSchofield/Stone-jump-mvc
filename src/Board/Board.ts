import Location from '../models/Location';
import V2 from '../models/V2';

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

    get grid(): Location[][] {
        return this._grid;
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

    // Is there any way to overload this?
    getStoneRef(...args: any[]): Location {
        if (args[0] instanceof V2) {
            return this._grid[args[0].y][args[0].x];
        }

        // args is (number, number)
        if (typeof args[0] === 'number' && typeof args[1] === 'number' ) {
            return this._grid[args[1]][args[0]];
        }
    }
}