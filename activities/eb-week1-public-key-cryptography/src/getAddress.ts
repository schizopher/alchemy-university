import { keccak256 } from "ethereum-cryptography/keccak";

export default function getAddress(publicKey: Uint8Array): Uint8Array {
  return keccak256(publicKey.slice(1)).slice(-20);
}
