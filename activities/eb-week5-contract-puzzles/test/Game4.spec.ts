import { expect } from "chai";
import { ethers } from "hardhat";

describe("Game4", function () {
  it("should be able to win game", async () => {
    const Contract = await ethers.getContractFactory("Game4");
    const contract = await Contract.deploy();
    await contract.deployed();

    const [signer1] = await ethers.getSigners();
    await contract.connect(signer1).write(signer1.address);
    await contract.connect(signer1).win(signer1.address);
    expect(await contract.isWon()).to.equal(true);
  });
});
