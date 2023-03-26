import { Contract } from "ethers";

export default function getValue(contract: Contract) {
  return contract.value();
}
