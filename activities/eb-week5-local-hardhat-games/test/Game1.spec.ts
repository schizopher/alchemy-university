import { expect } from "chai";
import { ethers } from "hardhat";

describe("Game1", function () {
  it("should be able to win game", async () => {
    const Contract = await ethers.getContractFactory("Game1");
    const contract = await Contract.deploy();
    await contract.deployed();

    const tx = await contract.win();
    await expect(tx).to.emit(contract, "Winner");
  });
});
