import { ethers } from "hardhat";
import { assert } from "chai";
import { Contract } from "ethers";

const num = 0;
describe("Contract2", function () {
  let contract: Contract;
  before(async () => {
    const Contract = await ethers.getContractFactory("Contract2");
    contract = await Contract.deploy(num);
    await contract.deployed();
  });

  it("should set the initial value to 0", async () => {
    const x = await contract.callStatic.x();
    assert.equal(x.toNumber(), 0);
  });

  describe("after one increment call", () => {
    before(async () => {
      await contract.increment();
    });

    it("should increase the value to 1", async () => {
      const x = await contract.callStatic.x();
      assert.equal(x.toNumber(), 1);
    });
  });

  describe("after a second increment call", () => {
    before(async () => {
      await contract.increment();
    });

    it("should increase the value to 2", async () => {
      const x = await contract.callStatic.x();
      assert.equal(x.toNumber(), 2);
    });
  });
});
