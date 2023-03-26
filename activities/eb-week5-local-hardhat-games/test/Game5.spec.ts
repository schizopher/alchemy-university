import { expect } from "chai";
import { ethers } from "hardhat";

describe("Game5", function () {
  it("should be able to win game", async () => {
    const Contract = await ethers.getContractFactory("Game5");
    const contract = await Contract.deploy();
    await contract.deployed();

    await contract.giveMeAllowance(99999);
    await contract.mint(99999);

    const tx = await contract.win();
    await expect(tx).to.emit(contract, "Winner");
  });
});
