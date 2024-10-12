export interface Entity {
    x: number;
    y: number;
    height: number;
    width: number;

    tick(deltaTime: number): void;
    draw(ctx: CanvasRenderingContext2D): void;

    get left(): number;
    get right(): number;
    get top(): number;
    get bottom(): number;

}