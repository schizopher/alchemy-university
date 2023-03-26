import { assert } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Contract1", function () {
  let contract: Contract;
  before(async () => {
    const Contract = await ethers.getContractFactory("Contract1");
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("should return the sum", async () => {
    assert.equal(await contract.sum([1, 1, 1, 1, 1]), 5);
    assert.equal(await contract.sum([1, 2, 3, 4, 5]), 15);
  });
});
