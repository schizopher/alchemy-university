import { assert } from "chai";
import { abi } from "../artifacts/contracts/MultiSig.sol/MultiSig.json";

describe("MultiSig: transactions", function () {
  const errors = [
    "Make sure to declare a public uint for the transaction count!",
    "Make sure to declare a public mapping for the transactions!",
  ];

  it("should define the transaction count", async function () {
    const transactionCount = abi.filter(
      (x) => x.name === "transactionCount"
    )[0];
    assert(transactionCount, errors[0]);
    assert(transactionCount.outputs);
    assert.deepEqual(
      transactionCount.outputs.map((x) => x.type),
      ["uint256"]
    );
  });

  it("should define a transactions mapping or array", async function () {
    const transactions = abi.filter((x) => x.name === "transactions")[0];
    assert(transactions, errors[1]);
    assert(transactions.outputs);
    assert(transactions.inputs);
    assert.deepEqual(
      transactions.inputs.map((x) => x.type),
      ["uint256"]
    );
    assert.deepEqual(
      transactions.outputs.map((x) => x.type),
      ["address", "uint256", "bool", "bytes"]
    );
  });
});
