import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Enum", () => {
  async function deployContract() {
    const Contract = await hre.ethers.getContractFactory("Enum");
    const contract = await Contract.deploy();
    return { contract };
  }

  it("should create four foods", async () => {
    const { contract } = await loadFixture(deployContract);
    for (let i = 1; i <= 4; i++) {
      const food = await contract.callStatic[`food${i}`]();
      assert.isAtLeast(food, 0);
    }
  });
});
