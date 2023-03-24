import * as dotenv from "dotenv";
import ethers from "ethers";
import hre from "hardhat";

dotenv.config();

async function main() {
  const GOERLI_URL = process.env.GOERLI_URL!;
  const provider = new ethers.providers.JsonRpcProvider(GOERLI_URL);

  const privateKey = process.env.PRIVATE_KEY!;
  const wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  const artifacts = await hre.artifacts.readArtifact("Faucet");
  const factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );
  const faucet = await factory.deploy();

  console.log("Faucet address:", faucet.address);
  await faucet.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
