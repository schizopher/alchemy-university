import type { Contract } from "ethers";
import { assert } from "chai";
import { ethers } from "hardhat";

describe("Contract", function () {
  let contract: Contract;

  before(async () => {
    const Contract = await ethers.getContractFactory("Contract");
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should log secret message and respond with secret response", async () => {
    const secretMessage = "SECRET";
    const secretResponse = 1337;
    const response = await contract.callStatic.getSecret(secretMessage);
    assert(
      response.toNumber() === secretResponse,
      "Did not return the secret response :("
    );
  });
});
