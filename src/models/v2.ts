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
}