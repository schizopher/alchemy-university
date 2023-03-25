import type { Contract, Signer } from "ethers";
import { ethers } from "hardhat";
import { assert } from "chai";

describe("Collectible", function () {
  let contract: Contract;
  let a2: string;
  let s2: Signer;

  before(async () => {
    const Collectible = await ethers.getContractFactory("Collectible");
    contract = await Collectible.deploy();
    await contract.deployed();
    s2 = ethers.provider.getSigner(1);
    a2 = await s2.getAddress();
  });

  it("should allow the owner to mark the price", async () => {
    await contract.markPrice(5);
    const val = await contract.callStatic.price();
    assert.equal(val.toNumber(), 5);
  });

  it("should throw if someone else tries to mark the price", async () => {
    let ex;
    try {
      await contract.connect(s2).markPrice(5);
    } catch (_ex) {
      ex = _ex;
    }
    assert(
      ex,
      "Expected the transaction to revert! Only the owner can mark the price."
    );
  });

  it("should throw if someone else tries to transfer the collectible", async () => {
    let ex;
    try {
      await contract.connect(s2).transfer(a2);
    } catch (_ex) {
      ex = _ex;
    }
    assert(
      ex,
      "Expected the transaction to revert! Only the owner can transfer the collectible."
    );
  });

  describe("after transferring", () => {
    before(async () => {
      await contract.transfer(a2);
    });

    it("should allow the new owner to mark the price", async () => {
      await contract.connect(s2).markPrice(10);
      const val = await contract.callStatic.price();
      assert.equal(val, 10);
    });
  });
});
