import Location from './Location';
import Board from "./Board";

export default class BoardView {
    private _board: Board;
    private _container: HTMLElement;

    constructor(container: HTMLElement, board: Board) {
        if (!container) {
            console.warn("Tried to instantiate a BoarView without container");
            return;
        }

        this._board = board;
        this._container = container;

        this.render();
    }

    getClassForRender(location: Location): string {
        let classString = 'col';

        if (location.isLocation) {
            classString += ' isLocation';
        }
        if (location.isFilled) {
            classString += ' isFilled';
        }
        if (location.isSelected) {
            classString += ' isSelected';
        }

        return classString;
    }

    boardToHtmlString() {
        const str = this._board.grid.map(row => (
            `<div class="board-row">
                ${row.map(loc => (
                    `<div class="${this.getClassForRender(loc)}"></div>`
                )).join("")}
            </div>`
        )).join("");
        console.log(str);
        return str;
    }

    render(): void {
        this._container.innerHTML = this.boardToHtmlString();
    }
}