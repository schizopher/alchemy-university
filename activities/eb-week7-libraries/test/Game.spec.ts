import type { Contract } from "ethers";
import { assert } from "chai";
import { ethers } from "hardhat";

describe("Game", function () {
  let library: Contract;

  before(async () => {
    const Library = await ethers.getContractFactory("UIntFunctions");
    library = await Library.deploy();
    await library.deployed();
  });

  [2, 4, 6].forEach((participants) => {
    describe(`for an even game of ${participants} participants`, () => {
      let contract: Contract;
      before(async () => {
        const Contract = await ethers.getContractFactory("Game", {
          libraries: { UIntFunctions: library.address },
        });
        contract = await Contract.deploy(participants);
        await contract.deployed();
      });

      it("should store the number of participants", async () => {
        const actual = await contract.callStatic.participants();
        assert.equal(actual, participants);
      });

      it("should allow teams", async () => {
        const allowed = await contract.callStatic.allowTeams();
        assert(allowed);
      });
    });
  });

  [3, 5, 7].forEach((participants) => {
    describe(`for an odd game of ${participants} participants`, () => {
      let contract: Contract;
      before(async () => {
        const Contract = await ethers.getContractFactory("Game", {
          libraries: { UIntFunctions: library.address },
        });
        contract = await Contract.deploy(participants);
        await contract.deployed();
      });

      it("should store the number of participants", async () => {
        const actual = await contract.participants.call();
        assert.equal(actual, participants);
      });

      it("should not allow teams", async () => {
        const allowed = await contract.allowTeams.call();
        assert(!allowed);
      });
    });
  });
});
