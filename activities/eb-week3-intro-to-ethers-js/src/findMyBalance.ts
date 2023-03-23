import { Wallet } from "ethers";
import { mockProvider } from "./config";

export default async function findMyBalance(privateKey: string) {
  const wallet = new Wallet(privateKey, mockProvider);
  return wallet.getBalance();
}
