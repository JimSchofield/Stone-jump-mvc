import V2 from "../util/V2";

export default class Location {
    constructor(
        public x: number,
        public y: number,
        public isFilled: boolean = false,
        public isLocation: boolean = false,
        public isSelected: boolean = false) {
    }

    static fromString(x: number, y: number, str: string) {
        switch (str) {
            case '1':
                return new Location(x, y, true, true, false);
            case '0':
                return new Location(x, y, false, true, false);
            default:
                return new Location(x, y, false, false, false);
        }
    }

    get v2(): V2 {
        return new V2(this.x, this.y);
    }
}