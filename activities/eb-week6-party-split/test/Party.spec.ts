import type { JsonRpcSigner } from "@ethersproject/providers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { BigNumber, Contract } from "ethers";
import { assert } from "chai";
import { ethers } from "hardhat";

const { parseEther } = ethers.utils;

describe("Party", () => {
  describe("RSVP", () => {
    const deposit = parseEther("2");
    let contract: Contract;
    let a1: JsonRpcSigner;

    beforeEach(async () => {
      a1 = await ethers.provider.getSigner(0);
      const Party = await ethers.getContractFactory("Party");
      contract = await Party.deploy(deposit);
    });

    it("should allow someone to RSVP who paid exactly the amount", async () => {
      await contract.connect(a1).rsvp({ value: deposit });
      const contractBalance = await ethers.provider.getBalance(
        contract.address
      );
      assert(contractBalance.eq(deposit));
    });

    it("should not allow someone to RSVP with less than the deposit", async () => {
      let ex;
      try {
        await contract.connect(a1).rsvp({ value: parseEther("1") });
      } catch (_ex) {
        ex = _ex;
      }
      assert(
        ex,
        "Only paid 1 ether for an RSVP requiring a 2 ether deposit. Expected transaction to revert!"
      );
    });

    it("should not allow someone to RSVP with more than the deposit", async () => {
      let ex;
      try {
        await contract.connect(a1).rsvp({ value: parseEther("3") });
      } catch (_ex) {
        ex = _ex;
      }
      assert(
        ex,
        "Paid 3 ether for an RSVP requiring a 2 ether deposit. Expected transaction to revert!"
      );
    });

    it("should not allow someone to RSVP who paid the deposit twice", async () => {
      let ex;
      await contract.connect(a1).rsvp({ value: deposit });
      try {
        await contract.connect(a1).rsvp({ value: deposit });
      } catch (_ex) {
        ex = _ex;
      }
      assert(
        ex,
        "Attempted to pay the deposit twice from the same account. Expected transaction to revert!"
      );
    });
  });
  describe("Pay Bill", () => {
    let friends: SignerWithAddress[];
    let venue: SignerWithAddress;
    let contract: Contract;
    let initialVenueBalance: BigNumber;
    let previousBalances: BigNumber[] = [];

    beforeEach(async () => {
      const signers = await ethers.getSigners();
      friends = signers.slice(1, 5);
      venue = signers[6];

      const Party = await ethers.getContractFactory("Party");
      contract = await Party.deploy(parseEther("2"));
      for (let i = 0; i < friends.length; i++) {
        await contract.connect(friends[i]).rsvp({
          value: parseEther("2"),
        });
        previousBalances[i] = await ethers.provider.getBalance(
          friends[i].address
        );
      }
      initialVenueBalance = await ethers.provider.getBalance(venue.address);
    });

    describe("for an eight ether bill", () => {
      const bill = parseEther("8");
      beforeEach(async () => {
        await contract.payBill(venue.address, bill);
      });

      it("should pay the bill", async () => {
        const balance = await ethers.provider.getBalance(venue.address);
        assert.equal(
          balance.toString(),
          initialVenueBalance.add(bill).toString()
        );
      });

      it("should refund nothing", async () => {
        for (let i = 0; i < 4; i++) {
          const balance = await ethers.provider.getBalance(friends[i].address);
          assert.equal(balance.toString(), previousBalances[i].toString());
        }
      });
    });

    describe("for a four ether bill", async () => {
      const bill = parseEther("4");
      beforeEach(async () => {
        await contract.payBill(venue.address, bill);
      });

      it("should pay the bill", async () => {
        const balance = await ethers.provider.getBalance(venue.address);
        assert.equal(
          balance.toString(),
          initialVenueBalance.add(bill).toString()
        );
      });

      it("should only have cost one ether each", async () => {
        for (let i = 0; i < 4; i++) {
          const balance = await ethers.provider.getBalance(friends[i].address);
          const expected = previousBalances[i].add(parseEther("1")).toString();
          assert.equal(balance.toString(), expected);
        }
      });
    });

    describe("for a two ether bill", async () => {
      const bill = parseEther("2");
      beforeEach(async () => {
        await contract.payBill(venue.address, bill);
      });

      it("should pay the bill", async () => {
        const balance = await (
          await ethers.provider.getBalance(venue.address)
        ).toString();
        assert.equal(balance, initialVenueBalance.add(bill).toString());
      });

      it("should only have cost .5 ether each", async () => {
        for (let i = 0; i < 4; i++) {
          const balance = await ethers.provider.getBalance(friends[i].address);
          const expected = previousBalances[i]
            .add(parseEther("1.5"))
            .toString();
          assert.equal(balance.toString(), expected.toString());
        }
      });
    });
  });
});
