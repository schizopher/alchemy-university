import { Contract } from "ethers";

export default function transfer(contract: Contract, friend: string) {
  return contract.transfer(friend, 500);
}
