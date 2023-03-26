import type { Contract, Signer } from "ethers";
import { ethers } from "hardhat";
import { assert } from "chai";

describe("Voting", function () {
  const voteInterface = new ethers.utils.Interface([
    "function mint(uint) external",
  ]);
  const data = voteInterface.encodeFunctionData("mint", [250]);
  const target = ethers.constants.AddressZero;

  let creator: string;
  let voter1: Signer;
  let voter2: Signer;
  let voter3: Signer;
  let voting: Contract;

  before(async () => {
    creator = await ethers.provider.getSigner(0).getAddress();
    voter1 = await ethers.provider.getSigner(1);
    voter2 = await ethers.provider.getSigner(2);
    voter3 = await ethers.provider.getSigner(3);

    const members = await Promise.all(
      [voter1, voter2, voter3].map((s) => s.getAddress())
    );

    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(members);
    await voting.deployed();
  });

  describe("creating a new vote", () => {
    before(async () => {
      await voting.newProposal(target, data);
    });

    describe("casting three votes", () => {
      let attributes: any;
      before(async () => {
        let id = 0;
        await voting.connect(voter1).castVote(id, true);
        await voting.connect(voter2).castVote(id, true);
        await voting.connect(voter3).castVote(id, false);
        attributes = await voting.proposals(id);
      });

      it("should have a yes count of 2", function () {
        assert(attributes.yesCount, "Could not find a yes count");
        assert.equal(attributes.yesCount.toNumber(), 2);
      });

      it("should have a no count of 1", function () {
        assert(attributes.noCount, "Could not find a no count");
        assert.equal(attributes.noCount.toNumber(), 1);
      });
    });
  });

  describe("creating a new vote", () => {
    before(async () => {
      await voting.newProposal(target, data);
    });

    describe("casting four votes: three from the same address", () => {
      let attributes: any;
      before(async () => {
        let id = 1;
        await voting.connect(voter1).castVote(id, false);
        await voting.connect(voter1).castVote(id, true);
        await voting.connect(voter1).castVote(id, true);
        await voting.connect(voter2).castVote(id, false);
        attributes = await voting.proposals(id);
      });

      it("should have a yes count of 1", function () {
        assert(attributes.yesCount, "Could not find the yes count");
        assert.equal(attributes.yesCount.toNumber(), 1);
      });

      it("should have a no count of 1", function () {
        assert(attributes.noCount, "Could not find the no count");
        assert.equal(attributes.noCount.toNumber(), 1);
      });

      describe("creating a newer vote", function () {
        let attributes2: any;
        before(async () => {
          await voting.newProposal(target, data);
        });

        describe("voting as the first voter", function () {
          before(async () => {
            let id = 2;
            await voting.connect(voter1).castVote(id, true);
            attributes2 = await voting.proposals(id);
          });

          it("should have a yes count of 1", function () {
            assert(attributes2.yesCount, "Could not find the yes count");
            assert.equal(attributes2.yesCount.toNumber(), 1);
          });

          it("should have a no count of 0", function () {
            assert(attributes2.noCount, "Could not find the no count");
            assert.equal(attributes2.noCount.toNumber(), 0);
          });
        });
      });
    });
  });
});
