import BoardView from "./Board/BoardView";
import Board from "./Board/Board";
import Referee from "./logic/Referee";
import V2 from "./util/V2";

export default class Controller {
    _board: Board;
    _boardView: BoardView;
    boardContainer: HTMLElement;
    _referee: Referee;

    constructor(boardContainer: HTMLElement, boardView: BoardView, referee: Referee) {
        this._board = boardView.board;
        this._boardView = boardView;
        this.boardContainer = boardContainer;
        this._referee = referee;

        this.init();
    }

    init() {
        this.attachHandlers();
    }

    attachHandlers() {
        this.boardContainer.addEventListener('click', (event: MouseEvent) => {
            // Check if location
            if (!(event.target as HTMLElement).dataset.coords) {
                return;
            }

            // peel off coords
            const [y, x] = (event.target as HTMLElement).dataset.coords.split(",").map(el => +el);

            // if stone is a valid selection, clear all and select stone
            if (!this._board.getStoneRef(x,y).isFilled) {
                // Don't move on to render
                return;
            } else {
                this.selectStone(x,y);
            }

            // TODO: find possible moves from selection
            const moves = this._referee.findMovesFrom(new V2(x,y), this._board);

            // render when all the calcs are done!
            this._boardView.render();
        });
    }

    selectStone(x: number,y: number) {
        this._board.clearStoneSelect();
        this._board.getStoneRef(x,y).isSelected = true;
    }
}