import type { Contract, ContractReceipt, Signer } from "ethers";
import { ethers } from "hardhat";
import { assert } from "chai";

describe("Voting", function () {
  const voteInterface = new ethers.utils.Interface([
    "function mint(uint) external",
  ]);
  const data = voteInterface.encodeFunctionData("mint", [250]);
  const target = ethers.constants.AddressZero;

  let contract: Contract;
  let owner: Signer;
  let member1: Signer;
  let member2: Signer;
  let nonmember: Signer;

  before(async () => {
    owner = ethers.provider.getSigner(0);
    member1 = ethers.provider.getSigner(1);
    member2 = ethers.provider.getSigner(2);
    nonmember = ethers.provider.getSigner(3);

    const Voting = await ethers.getContractFactory("Voting");
    contract = await Voting.deploy([
      await member1.getAddress(),
      await member2.getAddress(),
    ]);
    await contract.deployed();
  });

  describe("creating a new proposal from a nonmember", () => {
    it("should revert", async () => {
      let ex;
      try {
        await contract.connect(nonmember).newProposal(target, data);
      } catch (_ex) {
        ex = _ex;
      }
      assert(
        ex,
        "Attempted to create new proposal from a nonmember. Expected this transaction to revert!"
      );
    });
  });

  describe("creating a proposal from a member", () => {
    let receipt: ContractReceipt;
    before(async () => {
      const tx = await contract.connect(member1).newProposal(target, data);
      receipt = await tx.wait();
    });

    it("should emit an `ProposalCreated` event", () => {
      const event = receipt.events?.find((x) => x.event === "ProposalCreated");
      assert(event, "Event not found!");
    });

    describe("casting a vote as a nonmember", () => {
      it("should revert", async () => {
        let ex;
        try {
          await contract.connect(nonmember).castVote(0, true);
        } catch (_ex) {
          ex = _ex;
        }
        assert(
          ex,
          "Attempted to create new proposal from a nonmember. Expected this transaction to revert!"
        );
      });
    });

    describe("casting a vote as the owner", () => {
      let receipt: ContractReceipt;
      before(async () => {
        const tx = await contract.connect(owner).castVote(0, false);
        receipt = await tx.wait();
      });

      it("should emit an `VoteCast` event", () => {
        const event = receipt.events?.find((x) => x.event === "VoteCast");
        assert(event, "Event not found!");
      });
    });

    describe("casting a vote as the member", () => {
      let receipt: ContractReceipt;
      before(async () => {
        const tx = await contract.connect(member2).castVote(0, true);
        receipt = await tx.wait();
      });

      it("should emit an `VoteCast` event", () => {
        const event = receipt.events?.find((x) => x.event === "VoteCast");
        assert(event, "Event not found!");
      });
    });
  });
});
