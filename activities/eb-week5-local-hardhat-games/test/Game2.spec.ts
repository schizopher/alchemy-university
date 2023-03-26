import { expect } from "chai";
import { ethers } from "hardhat";

describe("Game2", function () {
  it("should be able to win game", async () => {
    const Contract = await ethers.getContractFactory("Game2");
    const contract = await Contract.deploy();
    await contract.deployed();

    await contract.setX(30);
    await contract.setY(20);

    const tx = await contract.win();
    await expect(tx).to.emit(contract, "Winner");
  });
});
