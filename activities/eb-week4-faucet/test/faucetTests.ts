import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Faucet", () => {
  async function deployContractAndSetVariables() {
    const FaucetContract = await hre.ethers.getContractFactory("Faucet");
    const faucet = await FaucetContract.deploy();
    const [owner] = await hre.ethers.getSigners();
    console.log("Signer 1 address: ", owner.address);
    return { faucet, owner };
  }

  it("should deploy and set the owner correctly", async () => {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow withdrawals above 0.1 ETH at a time", async () => {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    const withdrawAmount = hre.ethers.utils.parseEther("0.2");
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it("should not allow non-owners to destroy faucet", async () => {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    const [_, signer2] = await hre.ethers.getSigners();
    const nonOwnerFaucet = faucet.connect(signer2);
    await expect(nonOwnerFaucet.destroyFaucet()).to.be.reverted;
  });

  it("should allow owner to destroy faucet", async () => {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.destroyFaucet()).to.not.be.reverted;
    const codeAtAddress = await hre.ethers.provider.getCode(faucet.address);
    await expect(codeAtAddress).to.equal("0x");
  });

  it("should not allow non-owners to call withdrawAll", async () => {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    const [_, signer2] = await hre.ethers.getSigners();
    const nonOwnerFaucet = faucet.connect(signer2);
    await expect(nonOwnerFaucet.withdrawAll()).to.be.reverted;
  });

  it("should allow owner to call withdrawAll", async () => {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    await owner.sendTransaction({
      to: faucet.address,
      value: hre.ethers.utils.parseEther("10"),
    });
    const ownerBalance = await owner.getBalance();
    const withdrawAllTransaction = await faucet.withdrawAll();
    const withdrawAllReceipt = await withdrawAllTransaction.wait();
    await expect(withdrawAllTransaction).to.not.be.reverted;
    const ownerBalanceAfterWithdraw = await owner.getBalance();
    const gasUsed = withdrawAllReceipt.gasUsed.mul(
      withdrawAllReceipt.effectiveGasPrice
    );
    await expect(
      ownerBalance.add(hre.ethers.utils.parseEther("10")).sub(gasUsed)
    ).to.equal(ownerBalanceAfterWithdraw);
  });
});
