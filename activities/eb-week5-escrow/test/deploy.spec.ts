import { assert } from "chai";
import { ethers } from "hardhat";
import deploy from "../utils/deploy";

const deposit = ethers.utils.parseEther("1");
const artifactLocation = "./artifacts/contracts/Escrow.sol/Escrow.json";

describe("7. Escrow: deploy", function () {
  let contract;
  let accounts = {};
  beforeEach(async () => {
    const roles = ["arbiter", "beneficiary", "depositor"];
    for (let i = 0; i < roles.length; i++) {
      const signer = ethers.provider.getSigner(i);
      const address = await signer.getAddress();
      accounts[roles[i]] = { signer, address };
    }

    const { abi, bytecode } = JSON.parse(
      require("fs").readFileSync(artifactLocation).toString()
    );
    contract = await deploy(
      abi,
      bytecode,
      accounts.depositor.signer,
      accounts.arbiter.address,
      accounts.beneficiary.address
    );
  });

  it("should resolve with contract", async () => {
    assert(
      contract,
      "Expected the deploy function to return a promise resolving to a contract!"
    );
  });

  it("should be funded", async () => {
    let balance = await ethers.provider.getBalance(contract.address);
    assert.equal(balance.toString(), deposit.toString());
  });

  it("should set an arbiter", async () => {
    const _arbiter = await contract.callStatic.arbiter();
    assert.equal(_arbiter, accounts.arbiter.address);
  });

  it("should set a depositor", async () => {
    const _depositor = await contract.callStatic.depositor();
    assert.equal(_depositor, accounts.depositor.address);
  });

  it("should set a beneficiary", async () => {
    const _beneficiary = await contract.beneficiary.call();
    assert.equal(_beneficiary, accounts.beneficiary.address);
  });
});
