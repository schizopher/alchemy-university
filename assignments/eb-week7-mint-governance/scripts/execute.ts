import { parseEther, keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { ethers, network } from "hardhat";

async function main() {
  await network.provider.send("hardhat_mine", ["0x100"]);

  const GOVERNOR_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const governor = await ethers.getContractAt("MyGovernor", GOVERNOR_ADDRESS);
  const token = await ethers.getContractAt("MyToken", TOKEN_ADDRESS);

  const [owner] = await ethers.getSigners();
  const tx = await governor
    .connect(owner)
    .execute(
      [token.address],
      [0],
      [
        token.interface.encodeFunctionData("mint", [
          owner.address,
          parseEther("25000"),
        ]),
      ],
      keccak256(toUtf8Bytes("Give the owner more tokens!"))
    );
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
