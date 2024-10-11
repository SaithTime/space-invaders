export class Settings {
    inputForward: string;
    inputLeft: string;
    inputRight: string;
    inputShoot: string;

    numberOfStars: number;

    constructor() {
        this.inputForward = "z";
        this.inputLeft = "q";
        this.inputRight = "d";
        this.inputShoot = " ";

        this.numberOfStars = 300;
    }
}