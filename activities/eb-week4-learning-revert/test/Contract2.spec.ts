import { assert } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Contract", function () {
  async function deployContract() {
    const Contract = await ethers.getContractFactory("Contract2");
    const contract = await Contract.deploy();
    await contract.deployed();
    return { contract };
  }

  it("should fail when another account attempts to set a config variable", async () => {
    const { contract } = await loadFixture(deployContract);
    const vals = ["A", "B", "C"] as const;
    const other = ethers.provider.getSigner(1);
    for (let i = 0; i < vals.length; i++) {
      const val = vals[i];
      const methodName = `set${val}` as const;
      let ex;
      try {
        await contract.connect(other)[methodName](1);
      } catch (_ex) {
        ex = _ex;
      }
      if (!ex) {
        assert.fail(`Call to ${methodName} with non-owner did not fail!`);
      }
    }
  });

  it("should not fail when owner attempts to set a config variable", async () => {
    const { contract } = await loadFixture(deployContract);
    const vals = ["A", "B", "C"] as const;
    for (let i = 0; i < vals.length; i++) {
      const val = vals[i];
      const methodName = `set${val}` as const;
      await contract[methodName](1);
    }
  });
});
