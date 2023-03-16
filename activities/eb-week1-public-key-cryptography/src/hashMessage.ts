import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

export default function hashMessage(message: string): Uint8Array {
  const msgBytes = utf8ToBytes(message);
  const msgHash = keccak256(msgBytes);
  return msgHash;
}
