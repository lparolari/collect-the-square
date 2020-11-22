import { makeCoord } from "../coord";
import { isCollision, makeBoundingBox } from "../engine";

describe("collision", () => {
  const square1bb = makeBoundingBox(
    makeCoord(95, 95),
    makeCoord(105, 95),
    makeCoord(105, 105),
    makeCoord(95, 105)
  );

  test("bounding boxes do not intersect", () => {
    const square1bb = makeBoundingBox(
      makeCoord(0, 10),
      makeCoord(10, 10),
      makeCoord(10, 0),
      makeCoord(0, 0)
    );
    const square2bb = makeBoundingBox(
      makeCoord(20, 30),
      makeCoord(30, 30),
      makeCoord(30, 20),
      makeCoord(20, 20)
    );
    expect(isCollision(square1bb, square2bb)).toBe(false);
    expect(isCollision(square2bb, square1bb)).toBe(false);
  });

  test("bounding boxes intersect in top left corner of bb2", () => {
    const square2bb = makeBoundingBox(
      makeCoord(100, 100),
      makeCoord(110, 100),
      makeCoord(110, 110),
      makeCoord(100, 110)
    );

    expect(isCollision(square1bb, square2bb)).toBe(true);
    expect(isCollision(square2bb, square1bb)).toBe(true);
  });

  test("bounding boxes intersect in top right corner of bb2", () => {
    const square2bb = makeBoundingBox(
      makeCoord(90, 100),
      makeCoord(100, 100),
      makeCoord(100, 110),
      makeCoord(90, 110)
    );
    expect(isCollision(square1bb, square2bb)).toBe(true);
  });

  test("bounding boxes intersect in bottom right corner of bb2", () => {
    const square2bb = makeBoundingBox(
      makeCoord(90, 90),
      makeCoord(100, 90),
      makeCoord(100, 100),
      makeCoord(90, 100)
    );
    expect(isCollision(square1bb, square2bb)).toBe(true);
  });

  test("bounding boxes intersect in bottom left corner of bb2", () => {
    const square2bb = makeBoundingBox(
      makeCoord(100, 90),
      makeCoord(110, 90),
      makeCoord(110, 100),
      makeCoord(100, 100)
    );
    expect(isCollision(square1bb, square2bb)).toBe(true);
  });
});
