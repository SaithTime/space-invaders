import { Game } from "../main";
import { Entity } from "../objects/entities/entity";
import { Bullet } from "../objects/entities/impl/bullet";
import { Ennemy } from "../objects/entities/impl/ennemy";
import { Player } from "../objects/entities/impl/player";

export class EntityHandler {
    protected instance: Game;
    public player: Player;
    public bullets: Bullet[] = [];
    public ennemies: Ennemy[] = [];
    public lastSpawn: number;

    constructor(instance: Game) {
        this.instance = instance;
        this.player = new Player(instance);
        this.lastSpawn = performance.now() / 1000;
        this.addEnnemy(new Ennemy(this.instance));
    }

    public tick(deltaTime: number): void {
        this.player.tick(deltaTime);
        if (performance.now() / 1000 - this.lastSpawn > 0.3) {
            this.addEnnemy(new Ennemy(this.instance));
            this.lastSpawn = performance.now() / 1000;
        }

        this.bullets.forEach((b) => {
            b.tick(deltaTime);
            if (!(b.shooter instanceof Player) && this.isColliding(b, this.player)) {
                this.instance.stop();
            }
            if (!(b.shooter instanceof Ennemy)) {
                this.ennemies.forEach((e) => {
                    if (this.isColliding(b, e)) {
                        e.alive = false;
                        b.alive = false;
                    }
                });
            }
        });

        this.ennemies.forEach((e) => {
            e.tick(deltaTime);
            this.bullets.forEach((b) => {
                if (!(b.shooter instanceof Ennemy) && this.isColliding(b, e)) {
                    e.alive = false;
                    b.alive = false;
                }
            });
            if (this.isColliding(e, this.player)) {
                this.instance.stop();
            }
        });

        this.bullets = this.bullets.filter((b) => b.alive);
        this.ennemies = this.ennemies.filter((e) => e.alive);
    }
    public draw(ctx: CanvasRenderingContext2D): void {
        this.bullets.forEach((b) => b.draw(ctx));
        this.ennemies.forEach((e) => e.draw(ctx));

        this.player.draw(ctx);
    }

    public addBullet(bullet: Bullet): void {
        this.bullets.push(bullet);
    }
    public removeBullet(bullet: Bullet): void {
        this.bullets = this.bullets.filter((b) => b != bullet);
    }
    public addEnnemy(ennemy: Ennemy): void {
        this.ennemies.push(ennemy);
    }
    public removeEnnemy(ennemy: Ennemy): void {
        this.ennemies = this.ennemies.filter((e) => e != ennemy);
    }

    private isColliding(entity1: Entity, entity2: Entity): boolean {
        return (
            entity1.left < entity2.right &&
            entity1.right > entity2.left &&
            entity1.top < entity2.bottom &&
            entity1.bottom > entity2.top
        );
    }
}