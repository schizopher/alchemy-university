import { assert } from "chai";
import { addTransaction, mempool } from "../index";

describe("addTransaction", () => {
  it("should add the transaction to the mempool", () => {
    const transaction = { to: "bob", sender: "alice" };
    addTransaction(transaction);
    assert.equal(mempool.length, 1);
    assert.equal(mempool[0], transaction);
  });
});
