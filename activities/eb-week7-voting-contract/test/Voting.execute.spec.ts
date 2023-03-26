import type { Contract, ContractReceipt, Signer } from "ethers";
import { ethers } from "hardhat";
import { assert } from "chai";

describe("Voting", function () {
  const amount = 250;
  const voteInterface = new ethers.utils.Interface([
    "function mint(uint) external",
  ]);
  const data = voteInterface.encodeFunctionData("mint", [amount]);

  let contract: Contract;
  let signers: Signer[];
  let minter: Contract;

  before(async () => {
    signers = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    contract = await Voting.deploy(
      await Promise.all(signers.map((x) => x.getAddress()))
    );
    await contract.deployed();

    const Minter = await ethers.getContractFactory("Minter");
    minter = await Minter.deploy();
    await minter.deployed();

    await contract.connect(signers[0]).newProposal(minter.address, data);
  });

  describe("voting yes 9 times", () => {
    before(async () => {
      for (let i = 0; i < 9; i++) {
        const signer = signers[i];
        await contract.connect(signer).castVote(0, true);
      }
    });

    it("should not execute", async () => {
      assert.equal(await minter.minted(), 0);
    });

    describe("voting a 10th time", () => {
      before(async () => {
        const signer = signers[9];
        await contract.connect(signer).castVote(0, true);
      });

      it("should execute", async () => {
        assert.equal(await minter.minted(), amount);
      });
    });
  });
});
