export class Settings {
    public inputForward: string;
    public inputLeft: string;
    public inputRight: string;
    public inputShoot: string;

    public numberOfStars: number;

    constructor() {
        this.inputForward = "z";
        this.inputLeft = "q";
        this.inputRight = "d";
        this.inputShoot = " ";

        this.numberOfStars = 300;
    }
}