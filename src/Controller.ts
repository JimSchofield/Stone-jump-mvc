import BoardView from "./Board/BoardView";
import Board from "./Board/Board";
import Referee from "./logic/Referee";
import V2 from "./util/V2";
import ValidMoves from "./Components/MoveListComponent";
import MoveListComponent from "./Components/MoveListComponent";

export default class Controller {
    _board: Board;
    _boardView: BoardView;
    boardContainer: HTMLElement;
    _referee: Referee;
    _validMoveElement: ValidMoves

    constructor(boardContainer: HTMLElement, boardView: BoardView, referee: Referee) {
        this._board = boardView.board;
        this._boardView = boardView;
        this.boardContainer = boardContainer;
        this._referee = referee;

        this.init();
    }

    init() {
        this.createChildren()
            .attachHandlers();
    }

    createChildren(): this {

        const moveListcontainer = document.querySelector('.valid-moves') as HTMLElement;
        this._validMoveElement = new MoveListComponent(moveListcontainer);

        return this;
    }

    attachHandlers(): this {
        this.boardContainer.addEventListener('click', this.handleBoardClick);

        return this;
    }

    handleBoardClick = (event: MouseEvent): void => {
        // Check if location
        if (!(event.target as HTMLElement).dataset.coords) {
            this.clearBoardSelection();
            return;
        }

        // peel off coords
        const [y, x] = (event.target as HTMLElement).dataset.coords.split(",").map(el => +el);

        // check if there is a selected stone, and if so, check if
        // the event's target is a valid destination
        if (
            this._board.hasStoneSelected
            &&
            this._referee.moveIsValid({
                from: this._board.selectedStone.v2,
                to: new V2(x,y),
            }, this._board)
            ) {
                this._board.moveStone({
                    from: this._board.selectedStone.v2,
                    to: new V2(x,y),
                });
                this._boardView.render();
        }

        this.selectNewStone(x,y);
    }

    selectNewStone(x:number, y:number) {
        // if stone is a valid selection, clear all and select stone
        if (!this._board.getStoneRef(x,y).isFilled) {
            // Don't move on to render if not filled
            this.clearBoardSelection();
            return;
        }
        this._board.selectStone(x,y);

        // find possible moves from selection
        const moves = this._referee.findMovesFrom(new V2(x,y), this._board);
        this._validMoveElement.updateList(moves);

        // render when all the calcs are done!
        this._boardView.render();
    }

    clearBoardSelection() {
        this._board.clearStoneSelect();
        this._validMoveElement.clearList();
        this._boardView.render();
    }
}