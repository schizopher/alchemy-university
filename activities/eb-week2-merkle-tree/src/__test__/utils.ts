import crypto from "crypto";
import { ProofItem } from "../MerkleTree";

// use the crypto module to create a sha256 hash from the data passed in
export function sha256(data: crypto.BinaryLike) {
  return crypto.createHash("sha256").update(data).digest();
}

// the concat function we use to hash together merkle leaves
export function concatHash(left: Buffer, right: Buffer) {
  if (!left)
    throw new Error(
      "The concat function expects two hash arguments, the first was not received."
    );
  if (!right)
    throw new Error(
      "The concat function expects two hash arguments, the second was not received."
    );
  return sha256(Buffer.concat([left, right]));
}

// the concat function we use to show the merkle root calculation
export function concatLetters(left: string, right: string) {
  return `Hash(${left} + ${right})`;
}

// given a proof, finds the merkle root
export function hashProof(node: string, proof: ProofItem<Buffer>[]) {
  let data = sha256(node);
  for (let i = 0; i < proof.length; i++) {
    if (proof[i].left) data = concatHash(proof[i].data, data);
    else data = concatHash(data, proof[i].data);
  }
  return data;
}
