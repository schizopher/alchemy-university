export interface ProofItem<T> {
  data: T;
  left: boolean;
}

export default class MerkleTree<T> {
  leaves: T[];
  concat: (a: T, b: T) => T;

  constructor(leaves: T[], concat: (a: T, b: T) => T) {
    this.leaves = leaves;
    this.concat = concat;
  }

  getRoot() {
    let layer = this.leaves;
    while (layer.length > 1) {
      const nextLayer = [];
      for (let i = 0; i < layer.length; i += 2) {
        if (i + 1 >= layer.length) nextLayer.push(layer[i]);
        else nextLayer.push(this.concat(layer[i], layer[i + 1]));
      }
      layer = nextLayer;
    }
    return layer[0];
  }

  getProof(index: number) {
    const output: ProofItem<T>[] = [];
    let layer = this.leaves;
    let currIndex = index;
    while (layer.length > 1) {
      if (currIndex % 2 == 0) {
        if (layer[currIndex + 1]) {
          output.push({ data: layer[currIndex + 1], left: false });
        }
      } else {
        if (layer[currIndex - 1]) {
          output.push({ data: layer[currIndex - 1], left: true });
        }
      }
      const nextLayer = [];
      for (let i = 0; i < layer.length; i += 2) {
        if (i + 1 >= layer.length) nextLayer.push(layer[i]);
        else nextLayer.push(this.concat(layer[i], layer[i + 1]));
      }
      currIndex = Math.floor(currIndex / 2);
      layer = nextLayer;
    }
    return output;
  }
}
