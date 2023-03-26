import { expect } from "chai";
import { ethers } from "hardhat";

describe("Game3", function () {
  it("should be able to win game", async () => {
    const Contract = await ethers.getContractFactory("Game3");
    const contract = await Contract.deploy();
    await contract.deployed();

    const [signer1, signer2, signer3] = await ethers.getSigners();
    await contract
      .connect(signer1)
      .buy({ value: ethers.utils.parseEther("1") });
    await contract
      .connect(signer2)
      .buy({ value: ethers.utils.parseEther("2") });
    await contract
      .connect(signer3)
      .buy({ value: ethers.utils.parseEther("3") });
    await contract.win(signer2.address, signer3.address, signer1.address);
    expect(await contract.isWon()).to.equal(true);
  });
});
