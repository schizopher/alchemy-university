import * as dotenv from "dotenv";
import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";
dotenv.config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;
const TEST_PRIVATE_KEY = process.env.TEST_PRIVATE_KEY!;
const GOERLI_TEST_FAUCET_DONATION_ADDRESS =
  "0xD8Ea779b8FFC1096CA422D40588C4c0641709890";

const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
});
const wallet = new Wallet(TEST_PRIVATE_KEY);

async function main() {
  try {
    const nonce = await alchemy.core.getTransactionCount(
      wallet.address,
      "latest"
    );
    const transaction = {
      to: GOERLI_TEST_FAUCET_DONATION_ADDRESS,
      value: Utils.parseEther("0.001"),
      gasLimit: "21000",
      maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
      maxFeePerGas: Utils.parseUnits("20", "gwei"),
      nonce: nonce,
      type: 2,
      chainId: 5,
    };
    const rawTransaction = await wallet.signTransaction(transaction);
    console.log("Raw tx: ", rawTransaction);
    const tx = await alchemy.core.sendTransaction(rawTransaction);
    console.log(`https://goerli.etherscan.io/tx/${tx.hash}`);
  } catch (e: any) {
    console.log(e);
  }
}

main();
