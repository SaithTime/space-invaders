import { InputHandler } from "./handlers/input-handler";
import { Player } from "./objects/entities/impl/player";
import { Settings } from "./settings";

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    public height: number;
    public width: number;

    public settings: Settings;
    public inputs: InputHandler;


    private isRunning: boolean = false;
    private lastFrame: number = 0;
    private player: Player;

    constructor() {
        this.canvas = document.getElementById("app") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.height = this.canvas.height;
        this.width = this.canvas.width;

        this.settings = new Settings();
        this.inputs = new InputHandler(this);
        this.player = new Player(this);

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
        this.player.tick(deltaTime);
    }

    // Fonction de dessin (rendu du jeu)
    private draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
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