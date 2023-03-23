import { BigNumberish } from "ethers";
import { wallet } from "./config";

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
