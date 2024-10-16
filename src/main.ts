import { BackgroundHandler } from "./handlers/background-handler";
import { EntityHandler } from "./handlers/entity-handler";
import { InputHandler } from "./handlers/input-handler";
import { Settings } from "./settings";

export class Game {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected timer: HTMLParagraphElement;
    public height: number;
    public width: number;
    public settings: Settings;
    public inputs: InputHandler;
    public background: BackgroundHandler;
    public entities: EntityHandler;
    protected isRunning: boolean = false;
    protected lastFrame: number = 0;

    constructor() {
        this.canvas = document.getElementById("app") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.timer = document.getElementById("timer") as HTMLParagraphElement;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.settings = new Settings();
        this.inputs = new InputHandler(this);
        this.background = new BackgroundHandler(this);
        this.entities = new EntityHandler(this);

        this.init();
    }

    // Fonction pour démarrer le jeu
    protected init(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastFrame = performance.now();
            requestAnimationFrame((t) => this.gameLoop(t));
        }
    }

    // Fonction pour arrêter le jeu
    public stop(): void {
        this.isRunning = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Fonction de la boucle de jeu
    protected gameLoop(time: number): void {
        if (!this.isRunning) return;

        this.timer.innerText = "Timer: " + Math.floor(time / 1000);
        const deltaTime: number = time - this.lastFrame;
        this.lastFrame = time;

        this.tick(deltaTime);
        this.draw();

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    // Fonction de mise à jour (logique du jeu)
    protected tick(deltaTime: number): void {
        if (!this.isRunning) return;
        const deltaInSeconds = deltaTime / 1000;

        this.background.tick(deltaInSeconds);
        this.entities.tick(deltaInSeconds);
    }

    // Fonction de dessin (rendu du jeu)
    protected draw(): void {
        if (!this.isRunning) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.draw(this.ctx);
        this.entities.draw(this.ctx);
    }
}
new Game();