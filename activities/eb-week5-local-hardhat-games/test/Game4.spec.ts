import { expect } from "chai";
import { ethers } from "hardhat";

describe("Game4", function () {
  it("should be able to win game", async () => {
    const Contract = await ethers.getContractFactory("Game4");
    const contract = await Contract.deploy();
    await contract.deployed();
    const overflowValue = 255 + 10 - 210 + 1;
    const tx = await contract.win(overflowValue);
    await expect(tx).to.emit(contract, "Winner");
  });
});
