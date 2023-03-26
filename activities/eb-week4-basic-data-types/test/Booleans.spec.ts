import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Booleans", () => {
  async function deployContract() {
    const Contract = await hre.ethers.getContractFactory("Booleans");
    const contract = await Contract.deploy();
    return { contract };
  }

  it("should create variable a: true", async () => {
    const { contract } = await loadFixture(deployContract);
    const a = await contract.callStatic.a();
    assert.equal(a, true);
  });

  it("should create variable b: false", async () => {
    const { contract } = await loadFixture(deployContract);
    const b = await contract.callStatic.b();
    assert.equal(b, false);
  });
});
