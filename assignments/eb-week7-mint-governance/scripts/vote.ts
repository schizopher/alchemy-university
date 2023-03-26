import { ethers, network } from "hardhat";

async function main() {
  await network.provider.send("evm_mine");

  const GOVERNOR_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const proposalId =
    "63997564059716015854207526577796811027086785426375377214451436930533003201575";
  const governor = await ethers.getContractAt("MyGovernor", GOVERNOR_ADDRESS);

  const [owner] = await ethers.getSigners();
  const tx = await governor.connect(owner).castVote(proposalId, 1);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
