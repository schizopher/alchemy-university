import { expect } from "chai";
import { ethers } from "hardhat";

describe("Game2", function () {
  it("should be able to win game", async () => {
    const Contract = await ethers.getContractFactory("Game2");
    const contract = await Contract.deploy();
    await contract.deployed();

    await contract.switchOn(20);
    await contract.switchOn(47);
    await contract.switchOn(212);
    await contract.win();
    expect(await contract.isWon()).to.equal(true);
  });
});
