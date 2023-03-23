import { assert } from "chai";
import { ethers, Transaction } from "ethers";
import sendEther from "../sendEther";
import { wallet, mockProvider } from "../config";

const provider = mockProvider;
let tx: Transaction;

describe("sendEther", () => {
  beforeAll(async () => {
    const props = {
      value: ethers.utils.parseEther("1.0"),
      to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
    };
    tx = await sendEther(props);
    await sendEther(props);
    await sendEther(props);
  });
  it("should resolve with a transaction", async () => {
    assert(
      tx,
      "The function did not resolve with a transaction. Did you return the transaction promise?"
    );
    assert.equal(tx.to, "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92");
    assert.equal(tx.from, wallet.address);
    assert(tx.hash);
  });
  it("should get mined", async () => {
    const reciept = await provider.waitForTransaction(tx.hash!);
    assert(reciept);
    assert.equal(reciept.blockNumber, 1);
  });
  it("should have mined three blocks", async () => {
    const blockNumber = await provider.getBlockNumber();
    assert.equal(blockNumber, 3);
  });
});
