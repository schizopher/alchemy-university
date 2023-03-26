import { assert } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Contract", function () {
  async function deployContract() {
    const Contract = await ethers.getContractFactory("Contract");
    const contract = await Contract.deploy();
    await contract.deployed();
    return { contract };
  }

  describe("after 9 ticks", () => {
    it("should still exist", async () => {
      const { contract } = await loadFixture(deployContract);
      for (let i = 0; i < 9; i++) await contract.tick();
      const bytecode = await ethers.provider.getCode(contract.address);
      assert(bytecode !== "0x", "Contract does not exist after 9 ticks!");
    });
  });

  describe("after the tenth tick", () => {
    it("should not have any code", async () => {
      const { contract } = await loadFixture(deployContract);
      for (let i = 0; i < 10; i++) await contract.tick();
      const bytecode = await ethers.provider.getCode(contract.address);
      assert.equal(bytecode, "0x");
    });
  });
});
