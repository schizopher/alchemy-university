import { Contract, Signer } from "ethers";

export default function setMessage(contract: Contract, signer: Signer) {
  const signerContract = contract.connect(signer);
  return signerContract.modify("Hello world.");
}
