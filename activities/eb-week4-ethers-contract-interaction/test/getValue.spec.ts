import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import getValue from "../src/getValue";

describe("GetterContract", function () {
  const random = Math.floor(Math.random() * 1000);

  async function deployContract() {
    const Contract = await hre.ethers.getContractFactory("GetterContract");
    const contract = await Contract.deploy(random);
    await contract.deployed();
    return { contract };
  }

  it("should get the value", async () => {
    const { contract } = await loadFixture(deployContract);
    const value = await getValue(contract);
    assert.equal(value, random);
  });
});
