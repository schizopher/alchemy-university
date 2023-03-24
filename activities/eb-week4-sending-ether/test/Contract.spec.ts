import { assert } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Contract", function () {
  const charity = ethers.Wallet.createRandom().address;
  const value = ethers.utils.parseEther("1");

  async function deployContract() {
    const Contract = await ethers.getContractFactory("Contract");
    const contract = await Contract.deploy(charity);
    await contract.deployed();

    const owner = ethers.provider.getSigner(0);
    const tipper = ethers.provider.getSigner(1);
    await owner.sendTransaction({ to: contract.address, value });

    return { contract, owner, tipper };
  }

  it("should store the owner", async () => {
    const { contract } = await loadFixture(deployContract);
    const _owner = await contract.owner.call();
    const [owner] = await ethers.provider.listAccounts();
    assert.equal(_owner, owner);
  });

  it("should receive the ether", async () => {
    const { contract } = await loadFixture(deployContract);
    const balance = await ethers.provider.getBalance(contract.address);
    assert(balance.eq(value), "expected the ether to be received");
  });

  describe("after a .25 ether tip", () => {
    it("should send the tip to the owner", async () => {
      const { contract, owner, tipper } = await loadFixture(deployContract);
      const tip = ethers.utils.parseEther("0.25");
      const balanceBefore = await ethers.provider.getBalance(
        await owner.getAddress()
      );
      await contract.connect(tipper).tip({ value: tip });
      const balanceAfter = await ethers.provider.getBalance(
        await owner.getAddress()
      );
      assert.equal(balanceAfter.sub(balanceBefore).toString(), tip);
    });
  });

  describe("after a .5 ether tip", () => {
    it("should send the tip to the owner", async () => {
      const { contract, owner, tipper } = await loadFixture(deployContract);
      const tip = ethers.utils.parseEther("0.5");
      const balanceBefore = await ethers.provider.getBalance(
        await owner.getAddress()
      );
      await contract.connect(tipper).tip({ value: tip });
      const balanceAfter = await ethers.provider.getBalance(
        await owner.getAddress()
      );
      assert.equal(balanceAfter.sub(balanceBefore).toString(), tip);
    });
  });

  describe("after two .25 ether tips", () => {
    it("should add .5 ether to the owners balance", async () => {
      const { contract, owner, tipper } = await loadFixture(deployContract);
      const tip = ethers.utils.parseEther("0.25");
      const balanceBefore = await ethers.provider.getBalance(
        await owner.getAddress()
      );
      await contract.connect(tipper).tip({ value: tip });
      await contract.connect(tipper).tip({ value: tip });
      const balanceAfter = await ethers.provider.getBalance(
        await owner.getAddress()
      );
      assert.equal(
        balanceAfter.sub(balanceBefore).toString(),
        tip.mul(2).toString()
      );
    });
  });

  describe("after donating", () => {
    it("should add the donations to the charity balance", async () => {
      const { contract, tipper } = await loadFixture(deployContract);
      const donation = ethers.utils.parseEther("1");
      await contract.connect(tipper).donate();
      const _donation = await ethers.provider.getBalance(charity);
      assert.equal(_donation.toString(), donation.toString());
    });
    it("should destroy the contract", async () => {
      const { contract, tipper } = await loadFixture(deployContract);
      await contract.connect(tipper).donate();
      const bytecode = await ethers.provider.getCode(contract.address);
      assert.equal(bytecode, "0x");
    });
  });
});
