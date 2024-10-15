import { Game } from "../../../main";
import { Entity } from "../entity";
import { Player } from "./player";

export class Bullet implements Entity {
    protected instance: Game;
    public shooter: Entity;
    public x: number;
    public y: number;
    public height: number;
    public width: number;
    public speed: number;
    public alive: boolean;
    protected lifeTime: number;
    protected age: number;

    constructor(instance: Game, x: number, y: number, shooter: Entity) {
        this.instance = instance;
        this.shooter = shooter;
        this.x = x + 25 * (Math.random() * 1.5);

        if (this.shooter instanceof Player) {
            this.y = y - 20;
        } else {
            this.y = y + 20;
        }

        this.width = 5;
        this.height = 5;
        this.speed = 100;
        this.alive = true;
        this.lifeTime = 7;
        this.age = performance.now() / 1000;
    }


    tick(deltaTime: number): void {
        if (!this.alive) return;


        if (this.y < this.instance.height) {
            if (this.shooter instanceof Player) {
                this.y -= this.speed * deltaTime;
            } else {
                this.y += this.speed * deltaTime;
            }

        } if (performance.now() / 1000 - this.age >= this.lifeTime || this.bottom > this.instance.height || this.top < 0) {
            this.alive = false;
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
            if (this.shooter instanceof Player) {
                ctx.arc(this.x, this.y + i * 5, this.height - i, 0, Math.PI * 2);
            } else {
                ctx.arc(this.x, this.y - i * 5, this.height - i, 0, Math.PI * 2);
            }

            ctx.fill();
        }
    }
    get left() { return this.x; }
    get right() { return this.x + this.width; }
    get top() { return this.y; }
    get bottom() { return this.y + this.height; }
}