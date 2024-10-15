import { Game } from "../main";
import { Settings } from "../settings";

export class InputHandler {
    protected settings: Settings;
    protected keys: { [key: string]: boolean } = {};

    constructor(instance: Game) {
        this.settings = instance.settings;
        window.addEventListener('keydown', (e) => (this.keys[e.key.toLowerCase()] = true));
        window.addEventListener('keyup', (e) => (this.keys[e.key.toLowerCase()] = false));
    }

    public forward(): boolean {
        return this.keys[this.settings.inputForward.toLowerCase()];
    }
    public right(): boolean {
        return this.keys[this.settings.inputRight.toLowerCase()];
    }
    public left(): boolean {
        return this.keys[this.settings.inputLeft.toLowerCase()];
    }
    public shoot(): boolean {
        return this.keys[this.settings.inputShoot.toLowerCase()];
    }
}