import { ethers } from "hardhat";

async function main() {
  const CONTRACT_ADDRESS = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";
  const ContractCaller = await ethers.getContractFactory("ContractCaller");
  const contractCaller = await ContractCaller.deploy(CONTRACT_ADDRESS);
  await contractCaller.deployed();
  console.log("ContractCaller deployed at: ", contractCaller.address);
  const tx = await contractCaller.sendAttempt();
  console.log("SendAttempt tx: ", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
