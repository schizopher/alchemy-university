import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("SignedIntegers", () => {
  async function deployContract() {
    const Contract = await hre.ethers.getContractFactory("SignedIntegers");
    const contract = await Contract.deploy();
    return { contract };
  }

  it("should create two variables, one positive and one negative", async () => {
    const { contract } = await loadFixture(deployContract);
    const a = await contract.callStatic.a();
    const b = await contract.callStatic.b();
    const aPositive = a > 0 && b < 0;
    const bPositive = b > 0 && a < 0;
    assert(
      aPositive || bPositive,
      "Declare variables a and b where one is positive (above zero) and the other is negative (below zero)"
    );
  });

  it("should find the absolute difference between the two variables", async () => {
    const { contract } = await loadFixture(deployContract);
    const a = await contract.callStatic.a();
    const b = await contract.callStatic.b();
    const difference = await contract.callStatic.difference();
    assert.equal(difference, Math.abs(a - b));
  });
});
