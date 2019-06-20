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

    getClassForRender(): string {
        let classString = 'col';

        switch (true) {
            case this.isLocation:
                classString += ' isLocation';
            case this.isFilled:
                classString += ' isFilled';
            case this.isSelected:
                classString += ' isSelected';
        }

        return classString;
    }
}