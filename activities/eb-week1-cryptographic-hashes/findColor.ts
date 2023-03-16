import { sha256 } from "ethereum-cryptography/sha256";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

// the possible colors that the hash could represent
const COLORS = ["red", "green", "blue", "yellow", "pink", "orange"];

// given a hash, return the color that created the hash
export default function findColor(hash: Uint8Array) {
  for (const color of COLORS) {
    const colorBytes = utf8ToBytes(color);
    const colorHash = sha256(colorBytes);
    if (toHex(colorHash) === toHex(hash)) return color;
  }
}
