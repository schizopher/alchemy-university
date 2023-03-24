import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("UnsignedIntegers", () => {
  async function deployContract() {
    const Contract = await hre.ethers.getContractFactory("UnsignedIntegers");
    const contract = await Contract.deploy();
    return { contract };
  }

  it("should create variable a which is less than 256", async () => {
    const { contract } = await loadFixture(deployContract);
    const a = await contract.callStatic.a();
    assert.isAtMost(a, 255);
  });

  it("should create variable b which is greater than or equal to 256", async () => {
    const { contract } = await loadFixture(deployContract);
    const b = await contract.callStatic.b();
    assert.isAtLeast(b, 256);
  });

  it("should create variable sum which equals a and b together", async () => {
    const { contract } = await loadFixture(deployContract);
    const a = await contract.callStatic.a();
    const b = await contract.callStatic.b();
    const sum = await contract.callStatic.sum();
    assert.equal(sum.toNumber(), a + b);
  });
});
