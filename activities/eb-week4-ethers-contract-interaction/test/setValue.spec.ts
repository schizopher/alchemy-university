import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import setValue from "../src/setValue";

describe("SetterContract", function () {
  async function deployContract() {
    const Contract = await hre.ethers.getContractFactory("SetterContract");
    const contract = await Contract.deploy();
    await contract.deployed();
    return { contract };
  }

  it("should set the value", async () => {
    const { contract } = await loadFixture(deployContract);
    await setValue(contract);
    const value = await contract.value();
    assert(value.gt(0), "Expecting value to be modified. Still set at 0!");
  });
});
