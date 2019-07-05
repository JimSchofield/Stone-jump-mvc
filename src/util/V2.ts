export default class V2  {
    private _x: number;
    private _y: number;

    constructor(x: number,y: number) {
        this._x = +x;
        this._y = +y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get object(): {x: number, y: number} {
        return {
            x: this._x,
            y: this._y
        }
    }

    static fromObject(obj: {x: number, y: number}) {
        return new V2(obj.x, obj.y);
    }

    static fromArray(arr: [number, number]): V2 {
        return new V2(arr[0], arr[1]);
    }

    /*---- Operations ----*/

    add(v2: V2): this {
        this._x += v2.x;
        this._y += v2.y;
        return this;
    }

    static add(v1: V2, v2: V2): V2 {
        return new V2(v1.x + v2.x, v1.y + v2.y);
    }

    /*---- Geometry ----*/
    static midpoint(v: V2, w: V2): V2 {
        return new V2((v.x + w.x) / 2, (v.y + w.y) / 2);
    }

    static distance(v:V2, w: V2): number {
        return Math.sqrt(Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2));
    }
}