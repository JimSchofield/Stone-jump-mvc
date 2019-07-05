import Location from './Location';
import V2 from '../util/V2';
import { Move } from '../logic/Translation';

export default class Board {
    private _grid: Location[][] = [[]];
    public maxX: number;
    public maxY: number;

    constructor(grid: Location[][]) {
        this._grid = grid;
        this.maxX = this._grid[0].length - 1;
        this.maxY = this._grid.length - 1;
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

    // Is there any other way to overload this?
    getStoneRef(...args: any[]): Location {
        if (args[0] instanceof V2) {
            return this._grid[+args[0].y][+args[0].x];
        }

        // (number, number), ASSUME
        return this._grid[+args[1]][+args[0]];
    }

    clearStoneSelect(): void {
        this._grid.flat(2)
            .map((location: Location) => location.isSelected = false);
    }

    moveStone(move: Move): void {
        
    } 

    inBoardRange(coords: V2): boolean {
        const { x, y } = coords;
            
        return (
            x >= 0 && x <= this.maxX
            &&
            y >= 0 && y <= this.maxY
        );
    }
}