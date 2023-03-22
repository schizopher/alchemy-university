import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, bytesToHex } from "ethereum-cryptography/utils";

const concat = (left: Uint8Array, right: Uint8Array) =>
  keccak256(Buffer.concat([left, right]));

export default function verifyProof(
  proof: { data: string; left: boolean }[],
  leaf: Uint8Array,
  root: string
) {
  const proofBytes = proof.map(({ data, left }) => ({
    left,
    data: hexToBytes(data),
  }));
  let data = keccak256(Buffer.from(leaf));
  for (let i = 0; i < proofBytes.length; i++) {
    if (proofBytes[i].left) {
      data = concat(proofBytes[i].data, data);
    } else {
      data = concat(data, proofBytes[i].data);
    }
  }
  return bytesToHex(data) === root;
}
