import { sha256 } from "ethereum-cryptography/sha256";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { assert } from "chai";

import findColor from "../findColor";

const COLORS = ["red", "green", "blue", "yellow", "pink", "orange"];

describe("findColor", () => {
  COLORS.forEach((color) => {
    it(`should work for ${color}`, () => {
      assert.equal(findColor(sha256(utf8ToBytes(color))), color);
    });
  });
});
