import { Game } from "../../../main";
import { Entity } from "../entity";

export class Bullet implements Entity {
    instance: Game;
    x: number;
    y: number;
    height: number;
    width: number;
    speed: number;

    alive: boolean;
    lifeTime: number;
    age: number;

    constructor(instance: Game, x: number, y: number) {
        this.instance = instance;
        this.x = x + 25 * (Math.random() * 1.5);
        this.y = y - 20;
        this.width = 5;
        this.height = 5;
        this.speed = 100;

        this.alive = true;
        this.lifeTime = 3;
        this.age = performance.now() / 1000;
    }

    tick(deltaTime: number): void {
        if (!this.alive) return;

        if (performance.now() / 1000 - this.age >= this.lifeTime) {
            this.alive = false;
        } else if (this.y < this.instance.height) {
            this.y -= this.speed * deltaTime;
        }
    }
    draw(ctx: CanvasRenderingContext2D): void {
        if (!this.alive) return;

        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(this.x, this.y + i * 5, this.height - i, 0, Math.PI * 2);
            ctx.fill();
        }
    }

}