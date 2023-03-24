import { expect } from "chai";
import { ethers, network } from "hardhat";

describe("Game5", function () {
  it("should be able to win game", async () => {
    const TARGET_THRESHOLD = "0x00ffffffffffffffffffffffffffffffffffffff";
    const Contract = await ethers.getContractFactory("Game5");
    const contract = await Contract.deploy();
    await contract.deployed();
    let wallet = ethers.Wallet.createRandom();
    let address = wallet.address;
    while (address > TARGET_THRESHOLD) {
      wallet = ethers.Wallet.createRandom();
      address = wallet.address;
    }
    await network.provider.send("hardhat_setBalance", [
      address,
      "0x1000000000000000000000000000000000000000000000000000000000000000",
    ]);
    await contract.connect(wallet.connect(ethers.provider)).win();
    expect(await contract.isWon()).to.equal(true);
  });
});
