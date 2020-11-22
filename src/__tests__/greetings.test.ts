import { greet } from "../greetings";

describe("greet", () => {
  test('it returns "Hello ${name}!" for greeting name', () => {
    expect(greet("John")).toBe("Hello John!");
  });
});
