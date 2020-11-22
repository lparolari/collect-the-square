import { Coord, makeCoord } from "./coord";

export type Ctx = CanvasRenderingContext2D;
export type Canvas = HTMLCanvasElement;
export type Options = {
  fillStyle: string;
};
export type BoundingBox = {
  topLeft: Coord;
  topRight: Coord;
  bottomLeft: Coord;
  bottomRight: Coord;
};

export function makeBoundingBox(
  topLeft: Coord,
  topRight: Coord,
  bottomRight: Coord,
  bottomLeft: Coord
): BoundingBox {
  return {
    topLeft: topLeft,
    topRight: topRight,
    bottomLeft: bottomLeft,
    bottomRight: bottomRight,
  };
}

function getSqureBoundingBox(center: Coord, edge: number) {
  const ed = edge / 2;
  return makeBoundingBox(
    makeCoord(center.x - ed, center.y - ed),
    makeCoord(center.x + ed, center.y - ed),
    makeCoord(center.x + ed, center.y + ed),
    makeCoord(center.x - ed, center.y + ed)
  );
}

function square(ctx: Ctx, center: Coord, edge: number, options: Options) {
  ctx.fillStyle = options.fillStyle;
  ctx.fillRect(
    center.x - Math.floor(edge / 2),
    center.y - Math.floor(edge / 2),
    edge,
    edge
  );
  return getSqureBoundingBox(center, edge);
}

export function clear(canvas: Canvas, ctx: Ctx) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function player(ctx: Ctx, center: Coord) {
  return square(ctx, center, 50, { fillStyle: "#ff0000" });
}

export function apple(ctx: Ctx, center: Coord) {
  return square(ctx, center, 20, { fillStyle: "#00ff00" });
}

export function drawBoundingBox(ctx: Ctx, bb: BoundingBox) {
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.moveTo(bb.topLeft.x, bb.topLeft.y);
  ctx.lineTo(bb.topRight.x, bb.topRight.y);
  ctx.moveTo(bb.topRight.x, bb.topRight.y);
  ctx.lineTo(bb.bottomRight.x, bb.bottomRight.y);
  ctx.moveTo(bb.bottomRight.x, bb.bottomRight.y);
  ctx.lineTo(bb.bottomLeft.x, bb.bottomLeft.y);
  ctx.moveTo(bb.bottomLeft.x, bb.bottomLeft.y);
  ctx.lineTo(bb.topLeft.x, bb.topLeft.y);
  ctx.stroke();
}

export function isCollision(a: BoundingBox, b: BoundingBox) {
  if (
    b.topLeft.x >= a.topLeft.x &&
    b.topLeft.y >= a.topLeft.y &&
    b.topLeft.x <= a.bottomRight.x &&
    b.topLeft.y <= a.bottomRight.y
  )
    return true;

  if (
    b.topRight.x <= a.topRight.x &&
    b.topRight.y >= a.topRight.y &&
    b.topRight.x >= a.bottomLeft.x &&
    b.topRight.y <= a.bottomLeft.y
  )
    return true;

  if (
    b.bottomRight.x >= a.topLeft.x &&
    b.bottomRight.y >= a.topLeft.y &&
    b.bottomRight.x <= a.bottomRight.x &&
    b.bottomRight.y <= a.bottomRight.y
  )
    return true;

  if (
    b.bottomLeft.x <= a.topRight.x &&
    b.bottomLeft.y >= a.topRight.y &&
    b.bottomLeft.x >= a.bottomLeft.x &&
    b.bottomLeft.y <= a.bottomLeft.y
  )
    return true;

  return false;
}
