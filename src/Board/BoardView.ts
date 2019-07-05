import Location from './Location';
import Board from "./Board";

export default class BoardView {
    board: Board;
    private _container: HTMLElement;

    constructor(container: HTMLElement, board: Board) {
        if (!container) {
            console.warn("Tried to instantiate a BoarView without container");
            return;
        }

        this.board = board;
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
        const str = this.board.grid.map((row,y) => (
            `<div class="board-row">
                ${row.map((loc,x) => (
                    `<div class="${this.getClassForRender(loc)}" data-coords="${y},${x}"></div>`
                )).join("")}
            </div>`
        )).join("");
        return str;
    }

    render(): void {
        this._container.innerHTML = this.boardToHtmlString();
    }
}