import { sha256 } from "ethereum-cryptography/sha256";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

export default class Block {
  data: string;
  previousHash: string;

  constructor(data: string, previousHash = "") {
    this.data = data;
    this.previousHash = previousHash;
  }

  toHash(): string {
    return toHex(sha256(utf8ToBytes(this.data + this.previousHash)));
  }
}
