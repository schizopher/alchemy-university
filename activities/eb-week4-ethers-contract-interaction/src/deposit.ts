import { ethers, Contract } from "ethers";

export default function deposit(contract: Contract) {
  return contract.deposit({ value: ethers.utils.parseEther("1") });
}
