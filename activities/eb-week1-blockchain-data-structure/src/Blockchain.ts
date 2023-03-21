import Block from "./Block";

export default class Blockchain {
  chain: Block[];

  constructor() {
    this.chain = [new Block("0")];
  }

  addBlock(block: Block) {
    const prevHash = this.chain[this.chain.length - 1].toHash();
    block.previousHash = prevHash;
    this.chain.push(block);
  }

  isValid(): Boolean {
    let output = true;
    for (let i = this.chain.length - 1; i > 0; i--) {
      const currBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];
      output =
        output &&
        currBlock.previousHash.toString() === prevBlock.toHash().toString();
    }
    return output;
  }
}
