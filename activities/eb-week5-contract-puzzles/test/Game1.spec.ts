import { expect } from "chai";
import { ethers } from "hardhat";

describe("Game1", function () {
  it("should be able to win game", async () => {
    const Contract = await ethers.getContractFactory("Game1");
    const contract = await Contract.deploy();
    await contract.deployed();

    await contract.unlock();
    await contract.win();
    expect(await contract.isWon()).to.equal(true);
  });
});
