import { sign } from "ethereum-cryptography/secp256k1";
import hashMessage from "./hashMessage";

const PRIVATE_KEY =
  "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

export default async function signMessage(msg: string) {
  const hashedMessage = hashMessage(msg);
  return sign(hashedMessage, PRIVATE_KEY, { recovered: true });
}
