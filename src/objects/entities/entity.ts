export interface Entity {
    x: number;
    y: number;
    height: number;
    width: number;

    tick(deltaTime: number): void;
    draw(ctx: CanvasRenderingContext2D): void;

}