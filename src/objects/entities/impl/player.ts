import { Game } from "../../../main";
import { InputHandler } from "../../../handlers/input-handler";
import { Entity } from "../entity";
import { Bullet } from "./bullet";

export class Player implements Entity {
    protected instance: Game;
    protected inputs: InputHandler;
    public x: number;
    public y: number;
    public height: number;
    public width: number;
    public speedX: number;
    public speedY: number;

    private shotDelay: number;
    private lastShoot: number;


    constructor(instance: Game) {
        this.instance = instance;
        this.inputs = instance.inputs;
        this.x = this.instance.width / 2;
        this.y = this.instance.height - 50;
        this.height = 20;
        this.width = 50;

        this.speedX = 150;
        this.speedY = 200;

        this.shotDelay = 1;
        this.lastShoot = 0;
    }

    tick(deltaTime: number): void {
        let motX: number = this.x;
        let motY: number = this.y;

        //Player movements
        if (this.inputs.forward()) { motY -= this.speedY * deltaTime; }
        if (this.inputs.right()) { motX += this.speedX * deltaTime; }
        if (this.inputs.left()) { motX -= this.speedX * deltaTime; }

        //Player shooting
        let now: number = performance.now() / 1000;
        if (this.inputs.shoot() && now - this.lastShoot > this.shotDelay) {
            this.lastShoot = now;
            this.instance.entities.addBullet(new Bullet(this.instance, this.x, this.y, this));
        }

        //Gravity
        if (motY < this.instance.height - 50) {
            motY += 0.3 * (this.instance.height * 1.5 - motY) * deltaTime;
        }

        //Collision with border right
        if (motX < 0) {
            motX += 0 - motX;
        }

        //Collision with border left
        if (motX + this.width > this.instance.width) {
            motX -= motX + this.width - this.instance.width;
        }

        //Apply motion to position
        this.x = motX;
        this.y = motY;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    get left() { return this.x; }
    get right() { return this.x + this.width; }
    get top() { return this.y; }
    get bottom() { return this.y + this.height; }
}