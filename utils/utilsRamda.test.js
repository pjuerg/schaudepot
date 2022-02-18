// utils/utilsRamda.test.js

import { second } from "./utilsRamda";



describe("second", () => {
  test("[1,2,3] should be 2", () => {
    expect(second([1,2,3])).toBe(2);
  });

  test("['a', 'b', 'c']15 should be b", () => {
    expect(second(["a", "b", "c"])).toBe("b");
  });
});
