import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import deposit from "../src/deposit";

describe("DepositContract", function () {
  async function deployContract() {
    const Contract = await hre.ethers.getContractFactory("DepositContract");
    const contract = await Contract.deploy();
    await contract.deployed();
    return { contract };
  }

  it("should deposit at least 1 ether", async () => {
    const { contract } = await loadFixture(deployContract);
    await deposit(contract);
    const balance = await hre.ethers.provider.getBalance(contract.address);
    assert(balance.gte(hre.ethers.utils.parseEther("1")));
  });
});
