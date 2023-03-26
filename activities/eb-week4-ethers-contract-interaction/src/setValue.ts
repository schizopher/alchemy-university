import { Contract } from "ethers";

export default function setValue(contract: Contract) {
  return contract.modify(1);
}
