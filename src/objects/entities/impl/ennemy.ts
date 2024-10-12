import { EntityHandler } from "../../../handlers/entity-handler";
import { Entity } from "../entity";

export class Ennemy implements Entity {
    protected handler: EntityHandler;
    public x: number;
    public y: number;
    public height: number;
    public width: number;

    public speed: number;

    public alive: boolean;


    constructor(handler: EntityHandler) {
        this.handler = handler;
        this.x = 400;
        this.y = 0;
        this.height = 20;
        this.width = 50;
        this.speed = 25;
        this.alive = true;
    }

    tick(deltaTime: number): void {
        if (!this.alive) return;

        this.y += this.speed * deltaTime;
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