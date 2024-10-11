import { Game } from "../main";
import { Entity } from "../objects/entities/entity";
import { Bullet } from "../objects/entities/impl/bullet";
import { Player } from "../objects/entities/impl/player";

export class EntityHandler {
    protected instance: Game;
    protected entities: Entity[] = [];

    constructor(instance: Game) {
        this.instance = instance;
        this.addEntity(new Player(instance));
    }

    public tick(deltaTime: number): void {
        this.entities.forEach((e) => {
            e.tick(deltaTime)
            if (e instanceof Bullet) {
                if (!e.alive) this.entities = this.entities.filter((f) => f != e);
            }
        });
    }
    public draw(ctx: CanvasRenderingContext2D): void {
        this.entities.forEach((e) => e.draw(ctx));
    }

    public addEntity(entity: Entity) {
        this.entities.push(entity);
    }
    public removeEntity(entity: Entity) {
        this.entities = this.entities.filter((e) => e != entity);
    }
}