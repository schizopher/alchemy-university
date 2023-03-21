import { assert } from "chai";
import Transaction from "../Transaction";
import TXO from "../TXO";

describe("Transaction", function () {
  const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
  const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

  describe("with unspent input TXOs", () => {
    const inputTXO1 = new TXO(fromAddress, 5);
    const inputTXO2 = new TXO(fromAddress, 5);
    const outputTXO1 = new TXO(toAddress, 10);
    const tx = new Transaction([inputTXO1, inputTXO2], [outputTXO1]);

    it("should execute without error", () => {
      try {
        tx.execute();
      } catch (ex: any) {
        assert.fail(ex.message);
        console.log(ex);
      }
    });
  });

  describe("with a spent input TXO", () => {
    const txo1 = new TXO(fromAddress, 5);
    const txo2 = new TXO(fromAddress, 5);
    const txo3 = new TXO(fromAddress, 5);
    const outputTXO1 = new TXO(toAddress, 15);

    txo2.spend();

    const tx = new Transaction([txo1, txo2, txo3], [outputTXO1]);

    it("should throw an error on execute", () => {
      let ex;
      try {
        tx.execute();
      } catch (_ex: any) {
        ex = _ex;
      }
      assert(ex, "Did not throw an exception with a spent input TXO!");
    });
  });

  describe("with sufficient UTXOs", () => {
    const txo1 = new TXO(fromAddress, 5);
    const txo2 = new TXO(fromAddress, 5);
    const outputTXO1 = new TXO(toAddress, 10);
    const tx = new Transaction([txo1, txo2], [outputTXO1]);

    it("should execute without error", () => {
      try {
        tx.execute();
      } catch (ex: any) {
        assert.fail(ex.message);
        console.log(ex);
      }
    });
  });

  describe("with insufficient UTXOs", () => {
    const txo1 = new TXO(fromAddress, 3);
    const txo2 = new TXO(fromAddress, 3);
    const txo3 = new TXO(fromAddress, 3);
    const outputTXO1 = new TXO(toAddress, 10);

    const tx = new Transaction([txo1, txo2, txo3], [outputTXO1]);

    it("should throw an error on execute", () => {
      let ex;
      try {
        tx.execute();
      } catch (_ex: any) {
        ex = _ex;
      }
      assert(ex, "Did not throw an exception for a lack of UTXO funds!");
    });
  });

  const txo1 = new TXO(fromAddress, 5);
  const txo2 = new TXO(fromAddress, 5);
  const txo3 = new TXO(fromAddress, 3);
  const txo4 = new TXO(fromAddress, 4);
  const outputTXO1 = new TXO(toAddress, 7);
  const outputTXO2 = new TXO(fromAddress, 3);

  it("should mark both inputs as spent", () => {
    const tx = new Transaction([txo1, txo2], [outputTXO1, outputTXO2]);
    tx.execute();
    assert(txo1.spent);
    assert(txo2.spent);
  });

  it("should leave both inputs unspent if funds unavailable", () => {
    const tx = new Transaction([txo3, txo4], [outputTXO1, outputTXO2]);
    let ex;
    try {
      tx.execute();
    } catch (_ex: any) {
      ex = _ex;
    }
    assert(ex, "Expected an exception to be thrown!");
    assert(!txo3.spent, "The transaction should be marked as unspent");
    assert(!txo4.spent, "The transaction should be marked as unspent");
  });

  it("should leave valid inputs unspent if a double spend occurs", () => {
    const tx = new Transaction([txo1, txo4], [outputTXO1, outputTXO2]);
    let ex;
    try {
      tx.execute();
    } catch (_ex: any) {
      ex = _ex;
    }
    assert(ex, "Expected an exception to be thrown!");
    assert(!txo4.spent, "The transaction should be marked as unspent");
  });

  describe("with no remainder", () => {
    const txo1 = new TXO(fromAddress, 5);
    const txo2 = new TXO(fromAddress, 5);
    const outputTXO1 = new TXO(toAddress, 7);
    const outputTXO2 = new TXO(fromAddress, 3);
    const tx = new Transaction([txo1, txo2], [outputTXO1, outputTXO2]);
    tx.execute();
    it("should have zero fee", () => {
      assert.equal(tx.fee, 0);
    });
  });

  describe("with some remainder", () => {
    const txo1 = new TXO(fromAddress, 15);
    const outputTXO1 = new TXO(toAddress, 7);
    const outputTXO2 = new TXO(fromAddress, 6);
    const tx = new Transaction([txo1], [outputTXO1, outputTXO2]);
    tx.execute();
    it("should have the remainder as the fee", () => {
      assert.equal(tx.fee, 2);
    });
  });
});
