import type { Contract } from "ethers";
import { ethers } from "hardhat";
import { assert } from "chai";

async function expectThrow(promise: Promise<any>) {
  const errMsg = "Expected throw not received";
  try {
    await promise;
  } catch (err) {
    return;
  }
  assert(false, errMsg);
}

describe("MultiSig: confirmTransaction()", function () {
  let contract: Contract;
  let accounts: string[];
  let _required = 2;

  beforeEach(async () => {
    accounts = await ethers.provider.listAccounts();
    const MultiSig = await ethers.getContractFactory("MultiSig");
    contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
    await contract.deployed();
  });

  describe("after creating the first transaction", function () {
    beforeEach(async () => {
      await contract.addTransaction(accounts[1], 100, "0x");
      await contract.confirmTransaction(0);
    });

    it("should confirm the transaction", async function () {
      let confirmed = await contract.callStatic.getConfirmationsCount(0);
      assert.equal(confirmed, 1);
    });

    describe("after creating the second transaction", function () {
      beforeEach(async () => {
        await contract.addTransaction(accounts[1], 100, "0x");
        await contract.confirmTransaction(1);
        await contract
          .connect(ethers.provider.getSigner(accounts[1]))
          .confirmTransaction(1);
      });

      it("should confirm the transaction twice", async function () {
        let confirmed = await contract.callStatic.getConfirmationsCount(1);
        assert.equal(confirmed, 2);
      });
    });
  });

  describe("Errors", function () {
    beforeEach(async () => {
      await contract.addTransaction(accounts[1], 100, "0x");
    });

    describe("from an invalid address", () => {
      it("should throw an error", async function () {
        await expectThrow(
          contract
            .connect(ethers.provider.getSigner(accounts[3]))
            .confirmTransaction(0)
        );
      });
    });

    describe("from a valid owner address", () => {
      it("should not throw an error", async function () {
        await contract
          .connect(ethers.provider.getSigner(accounts[2]))
          .confirmTransaction(0);
        assert(true);
      });
    });
  });
});
