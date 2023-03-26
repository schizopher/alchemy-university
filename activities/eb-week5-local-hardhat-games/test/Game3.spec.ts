import { expect } from "chai";
import { ethers } from "hardhat";

describe("Game3", function () {
  it("should be able to win game", async () => {
    const Contract = await ethers.getContractFactory("Game3");
    const contract = await Contract.deploy();
    await contract.deployed();
    const tx = await contract.win(45);
    await expect(tx).to.emit(contract, "Winner");
  });
});
