import { Contract } from "ethers";
import hre from "hardhat";
import { assert } from "chai";

describe("Contract1", function () {
  [
    [1, 3],
    [2, 4],
    [3, 7],
  ].forEach(([x, y]) => {
    const expectedSum = x + y;
    describe(`when the contract is deployed with ${x}`, () => {
      let contract: Contract;
      before(async () => {
        const Contract = await hre.ethers.getContractFactory("Contract1");
        contract = await Contract.deploy(x);
        await contract.deployed();
      });
      it(`it should add ${y} to get ${expectedSum}`, async () => {
        const sum = await contract.callStatic.add(y);
        assert.equal(sum.toNumber(), expectedSum);
      });
    });
  });
});
