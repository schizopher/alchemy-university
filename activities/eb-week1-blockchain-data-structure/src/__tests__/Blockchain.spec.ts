import { sha256 } from "ethereum-cryptography/sha256";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { assert } from "chai";

import Block from "../Block";
import Blockchain from "../Blockchain";

describe("Blockchain", function () {
  let blockchain: Blockchain;
  beforeAll(() => {
    blockchain = new Blockchain();
  });
  describe("The Genesis Block", function () {
    it("should have a genesis block", function () {
      const genesisBlock = blockchain.chain[0];
      assert(genesisBlock, "Could not find the genesis block!");
      assert(genesisBlock instanceof Block, "genesis block should be a block!");
    });
  });
  describe("Adding New blocks", function () {
    let block1: Block;
    let block2: Block;
    beforeAll(() => {
      block1 = new Block("Some data");
      block2 = new Block("Some other data");
      blockchain.addBlock(block1);
      blockchain.addBlock(block2);
    });
    it("should have an addBlock function", function () {
      assert.equal(typeof blockchain.addBlock, "function");
    });
    it("should be a chain of three blocks", function () {
      assert.equal(blockchain.chain.length, 3);
    });
    it("should include block1 and block2", function () {
      assert(
        blockchain.chain.some((x) => x === block1),
        "Could not find block1. Remember to push the block argument in addBlock!"
      );
      assert(
        blockchain.chain.some((x) => x === block2),
        "Could not find block1. Remember to push the block argument in addBlock!"
      );
    });
  });
  describe("Linking Blocks", function () {
    beforeEach(() => {
      blockchain = new Blockchain();
    });
    describe("adding a new block to our blockchain", function () {
      let genesisBlock: Block;
      let block1: Block;
      beforeEach(() => {
        genesisBlock = new Block("5");
        block1 = new Block("5");
        blockchain.addBlock(genesisBlock);
        blockchain.addBlock(block1);
      });
      it("should have a previousHash property equal to the previous blocks hash", function () {
        assert.equal(
          block1.previousHash.toString(),
          genesisBlock.toHash().toString()
        );
      });
      describe("after changing the genesis block data", () => {
        let initialGenesisHash: string;
        let initialBlock1Hash: string;
        beforeEach(() => {
          initialGenesisHash = genesisBlock.toHash().toString();
          initialBlock1Hash = block1.toHash().toString();
          genesisBlock.data = "10";
        });
        it("should alter the genesis hash", () => {
          const newHash = genesisBlock.toHash().toString();
          assert.notEqual(
            initialGenesisHash,
            newHash,
            "Expected changing the genesis blocks data to change its hash calculation!"
          );
        });
        it("should alter the second blocks hash", () => {
          const newHash = genesisBlock.toHash().toString();
          assert.notEqual(
            initialBlock1Hash,
            newHash,
            "Expected changing the genesis blocks data to change the second blocks hash calculation!"
          );
        });
      });
    });
  });
  describe("Validating the Chain", function () {
    beforeEach(() => {
      blockchain = new Blockchain();
      blockchain.addBlock(new Block("Dan"));
      blockchain.addBlock(new Block("Peter"));
      blockchain.addBlock(new Block("James"));
    });
    it("should be considered valid", function () {
      assert(blockchain.isValid());
    });
    describe("tampering with a previousHash", function () {
      beforeEach(() => {
        blockchain.chain[1].previousHash = toHex(
          sha256(utf8ToBytes("gibberish"))
        );
      });
      it("should not be considered valid", function () {
        assert(!blockchain.isValid());
      });
    });
    describe("tampering with data", function () {
      beforeEach(() => {
        blockchain.chain[0].data = "Something Else";
      });
      it("should not be considered valid", function () {
        assert(!blockchain.isValid());
      });
    });
  });
});
