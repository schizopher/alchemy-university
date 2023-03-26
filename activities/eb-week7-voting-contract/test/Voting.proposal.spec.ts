import type { Contract } from "ethers";
import { ethers } from "hardhat";
import { assert } from "chai";

describe("Voting", function () {
  const mintInterface = new ethers.utils.Interface([
    "function mint(uint) external",
  ]);
  const data = mintInterface.encodeFunctionData("mint", [250]);
  const target = ethers.constants.AddressZero;

  let proposal: any;
  let creator: string;
  let voting: Contract;

  before(async () => {
    creator = await ethers.provider.getSigner(0).getAddress();

    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy([]);
    await voting.deployed();

    await voting.newProposal(target, data);
    proposal = await voting.proposals(0);
  });

  it("should store the target", async () => {
    assert(proposal, "Proposal not found");
    assert.equal(proposal.target, target);
  });

  it("should store the data", async () => {
    assert(proposal, "Proposal not found");
    assert.equal(proposal.data, data);
  });

  it("should store a 0 yesCount", async () => {
    assert(proposal, "Proposal not found");
    assert.equal(proposal.yesCount, 0);
  });

  it("should store a 0 noCount", async () => {
    assert(proposal, "Proposal not found");
    assert.equal(proposal.noCount, 0);
  });
});
