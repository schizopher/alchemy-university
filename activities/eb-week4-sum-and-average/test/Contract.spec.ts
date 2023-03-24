import { assert } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Contract", function () {
  async function deployContract() {
    const Contract = await ethers.getContractFactory("Contract");
    const contract = await Contract.deploy();
    await contract.deployed();
    return { contract };
  }

  [
    [2, 2, 4, 4],
    [1, 3, 5, 7],
    [8, 8, 8, 8],
  ].forEach(async ([a, b, c, d]) => {
    const { contract } = await loadFixture(deployContract);
    const expectedSum = a + b + c + d;
    const expectedAverage = expectedSum / 4;
    describe(`for ${a}, ${b}, ${c} and ${d}`, () => {
      it(`it should return ${expectedSum} and ${expectedAverage}`, async () => {
        const values = await contract.sumAndAverage(a, b, c, d);
        assert.equal(values[0], expectedSum);
        assert.equal(values[1], expectedAverage);
      });
    });
  });
});
