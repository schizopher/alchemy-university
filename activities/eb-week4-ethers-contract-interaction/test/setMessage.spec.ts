import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import setMessage from "../src/setMessage";

describe("SignerContract", function () {
  async function deployContract() {
    const Contract = await hre.ethers.getContractFactory("SignerContract");
    const contract = await Contract.deploy();
    await contract.deployed();
    return { contract };
  }

  it("should set the value", async () => {
    const { contract } = await loadFixture(deployContract);
    await setMessage(contract, hre.ethers.provider.getSigner(1));
    const message = await contract.message();
    assert.notEqual(
      message,
      "",
      "Expecting message to be modified. Still set to an empty string!"
    );
  });
});
