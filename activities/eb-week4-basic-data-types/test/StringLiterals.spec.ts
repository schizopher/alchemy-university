import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("StringLiterals", () => {
  async function deployContract() {
    const Contract = await hre.ethers.getContractFactory("StringLiterals");
    const contract = await Contract.deploy();
    return { contract };
  }

  it("should create a msg1 as bytes32 with hello world", async () => {
    const { contract } = await loadFixture(deployContract);
    const msg1 = await contract.callStatic.msg1();
    const ascii = hre.ethers.utils.parseBytes32String(msg1);
    assert(
      /hello world/i.test(ascii),
      "Could not find 'Hello World' in your msg1!"
    );
  });

  it("should create a msg2 as string which requires more than 32 bytes", async () => {
    const { contract } = await loadFixture(deployContract);
    const msg2 = await contract.callStatic.msg2();
    assert.isAtLeast(Buffer.byteLength(msg2, "utf8"), 32);
  });
});
