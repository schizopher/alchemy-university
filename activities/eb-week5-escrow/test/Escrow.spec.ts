import { ethers } from "hardhat";
import { assert } from "chai";

const deposit = ethers.utils.parseEther("1");

describe("Escrow", function () {
  let contract;
  let accounts = {};

  describe("setup", () => {
    before(async () => {
      const roles = ["arbiter", "beneficiary", "depositor"];
      for (let i = 0; i < roles.length; i++) {
        const signer = ethers.provider.getSigner(i);
        const address = await signer.getAddress();
        accounts[roles[i]] = { signer, address };
      }

      const Contract = await ethers.getContractFactory("Escrow");
      contract = await Contract.connect(accounts.depositor.signer).deploy(
        accounts.arbiter.address,
        accounts.beneficiary.address,
        { value: deposit }
      );
      await contract.deployed();
    });

    it("should be funded", async () => {
      let balance = await ethers.provider.getBalance(contract.address);
      assert.equal(balance.toString(), deposit.toString());
    });

    it("should set an arbiter", async () => {
      const _arbiter = await contract.arbiter.call();
      assert.equal(_arbiter, accounts.arbiter.address);
    });

    it("should set a depositor", async () => {
      const _depositor = await contract.depositor.call();
      assert.equal(_depositor, accounts.depositor.address);
    });

    it("should set a beneficiary", async () => {
      const _beneficiary = await contract.beneficiary.call();
      assert.equal(_beneficiary, accounts.beneficiary.address);
    });

    it("should be funded", async () => {
      let balance = await ethers.provider.getBalance(contract.address);
      assert.equal(balance.toString(), deposit.toString());
    });
  });

  describe("after approval", () => {
    let beforeBalance;
    before(async () => {
      beforeBalance = await ethers.provider.getBalance(
        accounts.beneficiary.address
      );
      await contract.connect(accounts.arbiter.signer).approve();
    });

    it("should transfer (using .call()) balance to beneficiary", async () => {
      const after = await ethers.provider.getBalance(
        accounts.beneficiary.address
      );
      assert.equal(after.sub(beforeBalance).toString(), deposit.toString());
    });

    it("should set the isApproved state to true", async () => {
      const isApproved = await contract.isApproved();
      assert(isApproved, "Expected isApproved to be true!");
    });
  });

  describe("after approval from address other than the arbiter", () => {
    it("should revert", async () => {
      let ex;
      try {
        await contract.connect(accounts.beneficiary.signer).approve();
      } catch (_ex) {
        ex = _ex;
      }
      assert(
        ex,
        "Attempted to approve the Escrow from the beneficiary address. Expected transaction to revert!"
      );
    });
  });

  describe("after approval from the arbiter", () => {
    before(async () => {
      const roles = ["arbiter", "beneficiary", "depositor"];
      for (let i = 0; i < roles.length; i++) {
        const signer = ethers.provider.getSigner(i);
        const address = await signer.getAddress();
        accounts[roles[i]] = { signer, address };
      }

      const Contract = await ethers.getContractFactory("Escrow");
      contract = await Contract.connect(accounts.depositor.signer).deploy(
        accounts.arbiter.address,
        accounts.beneficiary.address,
        { value: deposit }
      );
      await contract.deployed();
    });
    it("should transfer balance to beneficiary", async () => {
      const before = await ethers.provider.getBalance(
        accounts.beneficiary.address
      );
      await contract.connect(accounts.arbiter.signer).approve();
      const after = await ethers.provider.getBalance(
        accounts.beneficiary.address
      );
      assert.equal(after.sub(before).toString(), deposit.toString());
    });
  });
});
