import { Wallet } from "ethers";
import { provider } from "./config";

export default async function findMyBalance(privateKey: string) {
  const wallet = new Wallet(privateKey, provider);
  return wallet.getBalance();
}
