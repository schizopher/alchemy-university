import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ContractCaller", function () {
  async function deployContracts() {
    const Contract = await ethers.getContractFactory("Contract");
    const contract = await Contract.deploy();
    const ContractCaller = await ethers.getContractFactory("ContractCaller");
    const contractCaller = await ContractCaller.deploy(contract.address);
    return { contract, contractCaller };
  }

  it("should deploy and set the contract address correctly", async () => {
    const { contractCaller, contract } = await loadFixture(deployContracts);
    expect(await contractCaller.contractAddress()).to.equal(contract.address);
  });

  it("should be able to sendAttempt and emit Winner", async () => {
    const { contractCaller, contract } = await loadFixture(deployContracts);
    const tx = await contractCaller.sendAttempt();
    await expect(tx)
      .to.emit(contract, "Winner")
      .withArgs(contractCaller.address);
  });
});
