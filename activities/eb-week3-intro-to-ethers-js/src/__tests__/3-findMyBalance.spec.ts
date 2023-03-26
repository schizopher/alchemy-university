import { assert } from "chai";
import findMyBalance from "../findMyBalance";
import { PRIVATE_KEY, INITIAL_BALANCE } from "../config";

describe("findMyBalance", () => {
  it("should return an instance of Promise", () => {
    assert(findMyBalance(PRIVATE_KEY) instanceof Promise);
  });
  it("should resolve with the initial balance", async () => {
    const balance = await findMyBalance(PRIVATE_KEY);
    assert.equal(INITIAL_BALANCE.toString(), balance.toString());
  });
});
