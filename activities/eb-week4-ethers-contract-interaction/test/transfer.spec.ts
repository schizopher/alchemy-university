import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import transfer from "../src/transfer";

describe("TransferContract", function () {
  async function deployContract() {
    const accounts = await hre.ethers.provider.listAccounts();
    const owner = accounts[1];
    const friend = accounts[2];

    const Contract = await hre.ethers.getContractFactory("TransferContract");
    const contract = await Contract.deploy();
    await contract.deployed();

    return { contract, owner, friend };
  }

  describe("after transfer", () => {
    it("should decrease the owner balance", async () => {
      const { contract, friend, owner } = await loadFixture(deployContract);
      await transfer(contract, friend);
      const balance = await contract.balances(owner);
      assert(balance.lt(1000));
    });
    it("should increase the friend balance", async () => {
      const { contract, friend } = await loadFixture(deployContract);
      await transfer(contract, friend);
      const balance = await contract.balances(friend);
      assert(balance.gt(0));
    });
  });
});
