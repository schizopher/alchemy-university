import { Wallet, BigNumberish } from "ethers";
import { provider, PRIVATE_KEY } from "./config";

const wallet = new Wallet(PRIVATE_KEY, provider);

export default async function sendEther({
  value,
  to,
}: {
  value: BigNumberish;
  to: string;
}) {
  return wallet.sendTransaction({
    value,
    to,
    gasLimit: 0x5208,
    gasPrice: 0x3b9aca00,
  });
}
