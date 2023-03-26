import type { Contract } from "ethers";
import { ethers } from "hardhat";
import { assert } from "chai";

describe("MultiSig: addTransaction()", function () {
  let contract: Contract;
  let accounts: string[];
  let zero = ethers.constants.AddressZero;
  let _required = 2;

  beforeEach(async () => {
    accounts = await ethers.provider.listAccounts();
    const MultiSig = await ethers.getContractFactory("MultiSig");
    contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
    await contract.deployed();
  });

  it("should create a new Transaction", async function () {
    await contract.addTransaction(accounts[1], 100, "0x");
    let tx = await contract.callStatic.transactions;
    let address = tx[0];
    assert.notEqual(address, zero);
  });

  it("should keep count of the amount of transactions", async function () {
    await contract.addTransaction(accounts[1], 100, "0x");
    let txCount = await contract.callStatic.transactionCount();
    assert.equal(txCount.toNumber(), 1);
  });

  it("should return a transaction id", async function () {
    await contract.addTransaction(accounts[1], 100, "0x");
    let txId = await contract.callStatic.addTransaction(accounts[1], 100, "0x");
    assert.equal(txId.toNumber(), 1);
  });
});
