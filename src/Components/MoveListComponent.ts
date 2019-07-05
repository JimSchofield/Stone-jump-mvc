import MoveList, { Move } from "../logic/MoveList";

export default class MoveListComponent {
    _container: HTMLElement;
    moveList: MoveList;

    constructor(container: HTMLElement) {
        this._container = container;
        this.render();
    }

    updateList(moveList: MoveList) {
        this.moveList = moveList;
        this.render();
    }

    getListItems(): string {
        return this.moveList.map((move: Move) => {
            const {x,y} = move.from;
            const {x: toX, y: toY} = move.to;
            return `<li>(${x}, ${y}) => (${toX}, ${toY})</li>`
        }).join('');
    }

    clearList() {
        this.moveList = null;
        this.render();
    }

    render() {
        this._container.innerHTML = ``;

        if (this.moveList && this.moveList.length) {
            this._container.style.display = 'block';
            
            this._container.innerHTML = `
                <h2>Valid Moves from selection</h2>
                <ul>
                    ${this.getListItems()}
                </ul>
            `;
        } else {
            this._container.style.display = 'none';
        }
    }
}