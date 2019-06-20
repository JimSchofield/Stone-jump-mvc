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


    boardToHtmlString() {
        const str = this._board.grid.map(row => (
            `<div class="board-row">
                ${row.map(loc => (
                    `<div class="${loc.getClassForRender()}"></div>`
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