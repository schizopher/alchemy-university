import { keccak256 } from "ethereum-cryptography/keccak";
import { bytesToHex } from "ethereum-cryptography/utils";

export default class MerkleTree {
  leaves: Uint8Array[];
  concat: (left: Uint8Array, right: Uint8Array) => Uint8Array;

  constructor(leaves: string[]) {
    this.leaves = leaves.map(Buffer.from).map(keccak256);
    this.concat = (left, right) => keccak256(Buffer.concat([left, right]));
  }

  getRoot(): string {
    return bytesToHex(this._getRoot(this.leaves));
  }

  getProof(
    index: number,
    layer: Uint8Array[] = this.leaves,
    proof: { data: string; left: boolean }[] = []
  ): { data: string; left: boolean }[] {
    if (layer.length === 1) return proof;

    const newLayer: Uint8Array[] = [];

    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = layer[i + 1];

      if (!right) {
        newLayer.push(left);
      } else {
        newLayer.push(this.concat(left, right));

        if (i === index || i === index - 1) {
          let isLeft = !(index % 2);
          proof.push({
            data: isLeft ? bytesToHex(right) : bytesToHex(left),
            left: !isLeft,
          });
        }
      }
    }

    return this.getProof(Math.floor(index / 2), newLayer, proof);
  }

  // private function
  _getRoot(leaves: Uint8Array[] = this.leaves): Uint8Array {
    if (leaves.length === 1) {
      return leaves[0];
    }

    const layer: Uint8Array[] = [];

    for (let i = 0; i < leaves.length; i += 2) {
      const left = leaves[i];
      const right = leaves[i + 1];

      if (right) {
        layer.push(this.concat(left, right));
      } else {
        layer.push(left);
      }
    }

    return this._getRoot(layer);
  }
}
