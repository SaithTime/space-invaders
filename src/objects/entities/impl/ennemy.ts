import { EntityHandler } from "../../../handlers/entity-handler";
import { Game } from "../../../main";
import { Entity } from "../entity";
import { Bullet } from "./bullet";

export class Ennemy implements Entity {
    protected instance: Game;
    protected handler: EntityHandler;
    public x: number;
    public y: number;
    public height: number;
    public width: number;
    public speed: number;
    public alive: boolean;
    private lastshoot: number;
    public toRight: boolean;
    public toBottom: boolean;

    constructor(instance: Game) {
        this.instance = instance;
        this.handler = instance.entities;
        this.x = 10;
        this.y = 20;
        this.height = 20;
        this.width = 50;
        this.speed = 200;
        this.alive = true;
        this.lastshoot = performance.now() / 1000 + Math.random() * 20;
        this.toRight = true;
        this.toBottom = false;
    }

    tick(deltaTime: number): void {
        if (!this.alive) return;

        let motX: number = this.x;
        let motY: number = this.y;

        if (this.toRight) {
            motX += this.speed * deltaTime;

            if (motX + this.width >= this.instance.width) {
                motX -= motX + this.width - (this.instance.width);
                motY += 30;
                this.toRight = false;
            }
        } else if (!this.toRight) {
            motX -= this.speed * deltaTime;

            if (motX < 0) {
                motX -= 0 - motX;
                motY += 30
                this.toRight = true;
            }
        }

        if (performance.now() / 1000 > this.lastshoot) {
            this.instance.entities.addBullet(new Bullet(this.instance, this.x, this.y, this));
            this.lastshoot = performance.now() / 1000 + Math.random() * 10;
        }

        this.x = motX;
        this.y = motY;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (!this.alive) return;

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    get left() { return this.x; }
    get right() { return this.x + this.width; }
    get top() { return this.y; }
    get bottom() { return this.y + this.height; }
}