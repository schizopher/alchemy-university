import { ethers } from "hardhat";

async function main() {
  const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const token = await ethers.getContractAt("MyToken", TOKEN_ADDRESS);

  const [owner] = await ethers.getSigners();
  const ownerAddress = await owner.getAddress();

  const tx = await token.connect(owner).delegate(ownerAddress);
  await tx.wait();

  const delegatedTo = await token.callStatic.delegates(ownerAddress);
  console.log(`Delegated to ${delegatedTo}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
