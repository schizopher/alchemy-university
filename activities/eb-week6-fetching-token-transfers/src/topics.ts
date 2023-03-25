import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

export function firstTopic() {
  const eventSignature = "Transfer(address,address,uint256)";
  const bytes = utf8ToBytes(eventSignature);
  const digest = keccak256(bytes);
  return toHex(digest);
}

export function secondTopic() {
  let address = "0x28c6c06298d514db089934071355e5743bf21d60";
  address = address.slice(2);
  return "0".repeat(64 - address.length) + address;
}
