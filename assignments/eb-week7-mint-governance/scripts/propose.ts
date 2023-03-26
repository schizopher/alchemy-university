import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const GOVERNOR_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const governor = await ethers.getContractAt("MyGovernor", GOVERNOR_ADDRESS);
  const token = await ethers.getContractAt("MyToken", TOKEN_ADDRESS);
  const [owner] = await ethers.getSigners();
  const tx = await governor
    .connect(owner)
    .propose(
      [token.address],
      [0],
      [
        token.interface.encodeFunctionData("mint", [
          owner.address,
          parseEther("25000"),
        ]),
      ],
      "Give the owner more tokens!"
    );
  const receipt = await tx.wait();
  const event = receipt.events?.find((x) => x.event === "ProposalCreated");
  const proposalId = event?.args?.proposalId;
  console.log(`Proposal created with id ${proposalId}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
