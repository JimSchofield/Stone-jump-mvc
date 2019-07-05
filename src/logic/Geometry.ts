import { Translation } from "./Translation";
import V2 from "../util/V2";

export default class Geometry {
    private _translations: Translation[];
    
    constructor(t: Translation[]) {
        this._translations = t;
    }

    get translations(): Translation[] {
        return this._translations;
    }
}

const cartesianMoveList = [
    // up
    (coords: V2) => V2.add(new V2(0,-1), coords),
    // down
    (coords: V2) => V2.add(new V2(0,1), coords),
    // left
    (coords: V2) => V2.add(new V2(-1,0), coords),
    // right
    (coords: V2) => V2.add(new V2(1,0), coords),
]


const CartesianGeometry = new Geometry(cartesianMoveList);
export {
    CartesianGeometry
}