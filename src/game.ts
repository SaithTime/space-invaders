export class Game {
    protected isRunning: boolean;
    protected lastFrame: number;

    constructor() {
        this.isRunning = true;
        this.lastFrame = 0;
    }

    // Fonction pour démarrer le jeu
    private init(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastFrame = performance.now();
            requestAnimationFrame(this.gameLoop);
        }
    }
    // Fonction pour arrêter le jeu
    private stop(): void {
        this.isRunning = false;
    }


    // Fonction de mise à jour (logique du jeu)
    protected update(deltaTime: number): void {
        const deltaInSeconds = deltaTime / 1000;
    }

    // Fonction de dessin (rendu du jeu)
    protected draw(): void {

    }

    // Fonction de la boucle de jeu
    protected gameLoop(time: number): void {
        if (!this.isRunning) return;

        const deltaTime: number = time - this.lastFrame;
        this.lastFrame = time;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.gameLoop);
    }
}