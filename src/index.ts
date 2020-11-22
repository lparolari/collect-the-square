import { Coord, makeCoord } from "./coord";
import * as Engine from "./engine";

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

var left = false;
var right = false;
var top = false;
var bottom = false;

var cont = true;
var speed = 2;

var player: Coord;
var apple: Coord;
var squares: number = 0;

var showBoundingBox = false;

export function init() {
  canvas = <HTMLCanvasElement>document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  document.addEventListener("keydown", (e) => {
    if (e.key === "w") top = true;
    if (e.key === "a") left = true;
    if (e.key === "s") bottom = true;
    if (e.key === "d") right = true;
  });

  document.addEventListener("keypress", (e) => {
    // bouding box
    if (e.key === "z") showBoundingBox = !showBoundingBox;
    // exit
    if (e.key === "x") cont = false;
    // speed
    if (e.key === ",") speed -= 0.5;
    if (e.key === ".") speed += 0.5;
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "w") top = false;
    if (e.key === "a") left = false;
    if (e.key === "s") bottom = false;
    if (e.key === "d") right = false;
  });

  player = { x: 150, y: 150 };
  apple = { x: 200, y: 200 };

  setTimeout(() => {
    cont = false;
  }, 30000);

  start();
}

export function start() {
  Engine.clear(canvas, ctx);

  player.x += (left ? -1 : 0) * speed + (right ? 1 : 0) * speed;
  player.y += (top ? -1 : 0) * speed + (bottom ? 1 : 0) * speed;

  const playerBb = Engine.player(ctx, player);
  const appleBb = Engine.apple(ctx, apple);
  if (showBoundingBox) {
    Engine.drawBoundingBox(ctx, playerBb);
    Engine.drawBoundingBox(ctx, appleBb);
  }

  if (Engine.isCollision(playerBb, appleBb)) {
    squares++;
    apple = makeCoord(
      Math.floor(Math.random() * canvas.width),
      Math.floor(Math.random() * canvas.height)
    );
  }

  if (cont) {
    window.requestAnimationFrame(start);
  } else {
    Engine.clear(canvas, ctx);
    ctx.fillStyle = "#000000";
    ctx.font = "24px Arial";
    ctx.fillText("You collected " + squares + " squares!", 10, 30);
  }
}
