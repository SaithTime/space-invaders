import { Game } from "../../../main";
import { InputHandler } from "../../../handlers/input-handler";
import { Entity } from "../entity";

export class Player implements Entity {
    protected instance: Game;
    protected inputs: InputHandler;
    x: number;
    y: number;
    height: number;
    width: number;
    speed: number;

    constructor(instance: Game) {
        this.instance = instance;
        this.inputs = instance.inputs;
        this.x = this.instance.width / 2;
        this.y = this.instance.height - 50;
        this.height = 20;
        this.width = 50;
        this.speed = 150;
    }

    tick(deltaTime: number): void {
        let motX = this.x;
        let motY = this.y;

        //Player movements
        if (this.inputs.forward()) {
            motY -= this.speed * (deltaTime / 1000);
        }
        if (this.inputs.right()) {
            motX += this.speed * (deltaTime / 1000);
        }
        if (this.inputs.left()) {
            motX -= this.speed * (deltaTime / 1000);
        }
        //Gravity
        if (motY < this.instance.height - 50) {
            const gravityForce = 0.4 * (this.instance.height - motY);
            motY += gravityForce * (deltaTime / 1000);
        }

        //Collision right
        if (motX < 0) {
            motX += 0 - motX;
        }

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
}