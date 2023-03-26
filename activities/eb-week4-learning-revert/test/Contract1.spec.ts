import { assert } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Contract", function () {
  it("should not create a contract with a .5 ether deposit", async () => {
    let ex;
    try {
      const Contract = await ethers.getContractFactory("Contract1");
      const contract = await Contract.deploy({
        value: ethers.utils.parseEther(".5"),
      });
      await contract.deployed();
    } catch (_ex) {
      ex = _ex;
    }
    if (!ex) {
      assert.fail("Contract was created with a .5 ether deposit");
    }
  });

  it("should create a contract with a 1 ether deposit", async () => {
    const Contract = await ethers.getContractFactory("Contract1");
    const contract = await Contract.deploy({
      value: ethers.utils.parseEther("1"),
    });
    await contract.deployed();
  });

  it("should create a contract with a 2 ether deposit", async () => {
    const Contract = await ethers.getContractFactory("Contract1");
    const contract = await Contract.deploy({
      value: ethers.utils.parseEther("2"),
    });
    await contract.deployed();
  });

  const value = ethers.utils.parseEther("2");
  async function deployContract() {
    const Contract = await ethers.getContractFactory("Contract1");
    const contract = await Contract.deploy({ value });
    await contract.deployed();
    return { contract };
  }

  it("should fail when another account attempts to withdraw", async () => {
    const { contract } = await loadFixture(deployContract);
    let ex;
    try {
      const signer = ethers.provider.getSigner(1);
      await contract.connect(signer).withdraw();
    } catch (_ex) {
      ex = _ex;
    }
    if (!ex) {
      assert.fail("Attempt to withdraw with non-owner did not fail!");
    }
  });

  it("should succeed when the owner attempts to withdraw", async () => {
    const { contract } = await loadFixture(deployContract);
    const owner = ethers.provider.getSigner(0);
    const balanceBefore = await ethers.provider.getBalance(
      await owner.getAddress()
    );
    const gasPrice = ethers.utils.parseUnits("2", "gwei");
    const tx = await contract.connect(owner).withdraw({ gasPrice });
    const receipt = await tx.wait();
    const etherUsed = receipt.gasUsed.mul(gasPrice);
    const balanceAfter = await ethers.provider.getBalance(
      await owner.getAddress()
    );
    assert.equal(
      balanceAfter.toString(),
      balanceBefore.sub(etherUsed).add(value).toString(),
      "Unexpected Owner Balance (did you withdraw all funds?)"
    );
  });
});
