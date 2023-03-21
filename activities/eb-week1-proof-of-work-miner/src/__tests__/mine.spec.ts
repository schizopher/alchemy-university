import { assert } from "chai";
import { sha256 } from "ethereum-cryptography/sha256";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import {
  mine,
  blocks,
  mempool,
  addTransaction,
  resetMempool,
  resetBlocks,
  TARGET_DIFFICULTY,
} from "../index";

describe("mine", () => {
  describe("first block", () => {
    let hash;
    beforeAll(() => {
      hash = mine();
    });
    it("should add to the blocks", () => {
      assert.equal(blocks.length, 1);
    });
    it("should store the expected id and return the expected hash", () => {
      const lastBlock = blocks[blocks.length - 1];
      const expectedHash = sha256(
        utf8ToBytes(
          JSON.stringify({
            id: 0,
            transactions: [],
            nonce: 3,
          })
        )
      );
      assert(lastBlock.id != null, "did not find an id property on the block");
      assert.equal(lastBlock.id, 0);
      assert.equal(lastBlock.hash.toString(), expectedHash.toString());
    });
  });
  describe("second block", () => {
    let hash;
    beforeAll(() => {
      hash = mine();
    });
    it("should add to the blocks", () => {
      assert.equal(blocks.length, 2);
    });
    it("should store the expected id and return the expected hash", () => {
      const lastBlock = blocks[blocks.length - 1];
      const expectedHash = sha256(
        utf8ToBytes(
          JSON.stringify({
            id: 1,
            transactions: [],
            nonce: 5,
          })
        )
      );
      assert(lastBlock.id != null, "did not find an id property on the block");
      assert.equal(lastBlock.id, 1);
      assert.equal(lastBlock.hash.toString(), expectedHash.toString());
    });
  });
  describe("with 5 mempool transactions", () => {
    beforeAll(() => {
      resetBlocks();
      resetMempool();
      for (let i = 0; i < 5; i++)
        addTransaction({ sender: "bob", to: "alice" });
    });
    describe("after mining", () => {
      beforeAll(() => mine());
      it("should add to the blocks", () => {
        assert.equal(blocks.length, 1);
      });
      it("should store the transactions on the block", () => {
        assert.equal(blocks[blocks.length - 1].transactions.length, 5);
      });
      it("should clear the mempool", () => {
        assert.equal(mempool.length, 0);
      });
      it("should have a nonce", () => {
        assert.isDefined(
          blocks[blocks.length - 1].nonce,
          "did not find a nonce on the block"
        );
      });
      it("should have a hash lower than the target difficulty", () => {
        const actual = toHex(blocks[blocks.length - 1].hash);
        const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
        assert(
          isLess,
          "expected the hash to be less than the target difficulty"
        );
      });
    });
  });
  describe("with 15 mempool transactions", () => {
    beforeAll(() => {
      for (let i = 0; i < 15; i++) {
        addTransaction({ sender: "bob", to: "alice" });
      }
    });
    describe("after mining", () => {
      beforeAll(() => mine());
      it("should add to the blocks", () => {
        assert.equal(blocks.length, 2);
      });
      it("should store the transactions on the block", () => {
        assert.equal(blocks[blocks.length - 1].transactions.length, 10);
      });
      it("should reduce the mempool to 5", () => {
        assert.equal(mempool.length, 5);
      });
      describe("after mining again", () => {
        beforeAll(() => mine());
        it("should add to the blocks", () => {
          assert.equal(blocks.length, 3);
        });
        it("should store the transactions on the block", () => {
          assert.equal(blocks[blocks.length - 1].transactions.length, 5);
        });
        it("should clear the mempool", () => {
          assert.equal(mempool.length, 0);
        });
        it("should have a nonce", () => {
          assert.isDefined(
            blocks[blocks.length - 1].nonce,
            "did not find a nonce on the block"
          );
        });
        it("should have a hash lower than the target difficulty", () => {
          const actual = toHex(blocks[blocks.length - 1].hash);
          const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
          assert(
            isLess,
            "expected the hash to be less than the target difficulty"
          );
        });
      });
    });
  });
});
