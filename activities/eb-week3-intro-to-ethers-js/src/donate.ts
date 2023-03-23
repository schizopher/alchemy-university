import { Wallet, utils } from "ethers";
import { mockProvider } from "./config";

export default async function donate(privateKey: string, charities: string[]) {
  const wallet = new Wallet(privateKey, mockProvider);
  for (const charity of charities) {
    await wallet.sendTransaction({
      to: charity,
      value: utils.parseUnits("1", "ether"),
      gasLimit: 21000,
    });
  }
}
