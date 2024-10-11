import { BackgroundHandler } from "./handlers/background-handler";
import { InputHandler } from "./handlers/input-handler";
import { Entity } from "./objects/entities/entity";
import { Player } from "./objects/entities/impl/player";
import { Settings } from "./settings";

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    public height: number;
    public width: number;

    public settings: Settings;
    public inputs: InputHandler;
    private background: BackgroundHandler;


    private isRunning: boolean = false;
    private lastFrame: number = 0;
    private entities: Entity[] = [];

    constructor() {
        this.canvas = document.getElementById("app") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.height = this.canvas.height;
        this.width = this.canvas.width;

        this.settings = new Settings();
        this.inputs = new InputHandler(this);
        this.background = new BackgroundHandler(this);
        this.entities.push(new Player(this));

        this.init();
    }

    // Fonction pour démarrer le jeu
    private init(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastFrame = performance.now();
            requestAnimationFrame((t) => this.gameLoop(t));
        }
    }

    // Fonction pour arrêter le jeu
    private stop(): void {
        this.isRunning = false;
    }

    // Fonction de mise à jour (logique du jeu)
    private tick(deltaTime: number): void {
        const deltaInSeconds = deltaTime / 1000;
        this.entities.forEach((e) => e.tick(deltaInSeconds));
        this.background.tick(deltaInSeconds);
    }

    // Fonction de dessin (rendu du jeu)
    private draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.draw(this.ctx);
        this.entities.forEach((e) => e.draw(this.ctx))
    }

    // Fonction de la boucle de jeu
    private gameLoop(time: number): void {
        if (!this.isRunning) return;

        const deltaTime: number = time - this.lastFrame;
        this.lastFrame = time;

        this.tick(deltaTime);
        this.draw();

        requestAnimationFrame((t) => this.gameLoop(t));
    }
}
new Game();