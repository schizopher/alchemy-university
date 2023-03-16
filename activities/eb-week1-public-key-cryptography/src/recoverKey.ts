import { recoverPublicKey } from "ethereum-cryptography/secp256k1";
import hashMessage from "./hashMessage";

export default async function recoverKey(
  message: string,
  signature: Uint8Array,
  recoveryBit: number
) {
  return recoverPublicKey(hashMessage(message), signature, recoveryBit);
}
