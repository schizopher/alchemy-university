import { ethers } from "hardhat";

async function main() {
  const CONTRACT_ADDRESS = "0x873289a1aD6Cf024B927bd13bd183B264d274c68";
  const bucket = await ethers.getContractAt("Bucket", CONTRACT_ADDRESS);

  const BucketToken = await ethers.getContractFactory("BucketToken");
  const bucketToken = await BucketToken.deploy();
  await bucketToken.deployed();
  console.log("ContractCaller deployed at: ", bucketToken.address);

  const tokenAmount = 1000;
  await bucketToken.approve(CONTRACT_ADDRESS, tokenAmount);
  const tx = await bucket.drop(bucketToken.address, tokenAmount);
  console.log("Bucket.drop tx: ", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
