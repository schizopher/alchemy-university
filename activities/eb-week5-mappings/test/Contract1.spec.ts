import { assert } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Contract1", function () {
  let contract: Contract;
  let members: string[];
  let nonMember: string;

  before(async () => {
    const Contract = await ethers.getContractFactory("Contract1");
    contract = await Contract.deploy();
    await contract.deployed();

    const accounts = await ethers.provider.listAccounts();
    members = accounts.slice(0, 2);
    nonMember = accounts[2];
  });

  describe("Part 1: Add Member", () => {
    before(async () => {
      for (let i = 0; i < members.length; i++) {
        await contract.addMember(members[i]);
      }
    });
    it("should find added members", async () => {
      for (let i = 0; i < members.length; i++) {
        assert(await contract.callStatic.members(members[i]));
      }
    });
    it("should not find a non-member", async () => {
      assert(!(await contract.callStatic.members(nonMember)));
    });
  });

  describe("Part 2: isMember", () => {
    before(async () => {
      for (let i = 0; i < members.length; i++) {
        await contract.addMember(members[i]);
      }
    });
    it("should find added members", async () => {
      for (let i = 0; i < members.length; i++) {
        assert(await contract.callStatic.isMember(members[i]));
      }
    });
    it("should not find a non-added member", async () => {
      assert(!(await contract.callStatic.isMember(nonMember)));
    });
  });

  describe("Part 3: Remove Member", () => {
    before(async () => {
      for (let i = 0; i < members.length; i++) {
        await contract.addMember(members[i]);
      }
    });
    it("should find added members", async () => {
      for (let i = 0; i < members.length; i++) {
        assert(await contract.callStatic.isMember(members[i]));
      }
    });
    it("should not find a non-added member", async () => {
      assert(!(await contract.callStatic.isMember(nonMember)));
    });
    describe("after removing a member", () => {
      before(async () => {
        await contract.removeMember(members[0]);
      });
      it("should not find that member", async () => {
        assert(!(await contract.callStatic.isMember(members[0])));
      });
      it("should still find the other member", async () => {
        assert(await contract.callStatic.isMember(members[1]));
      });
    });
  });
});
