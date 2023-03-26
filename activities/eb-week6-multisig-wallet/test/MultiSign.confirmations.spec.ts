import { assert } from "chai";
import { abi } from "../artifacts/contracts/MultiSig.sol/MultiSig.json";

describe("MultiSig: confirmations", function () {
  const error = "Make sure to declare a public uint for the confirmations!";
  it("should define a confirmations mapping", async function () {
    const confirmations = abi.filter((x) => x.name === "confirmations")[0];
    assert(confirmations, error);
    assert(confirmations.inputs);
    assert(confirmations.outputs);
    assert.deepEqual(
      confirmations.inputs.map((x) => x.type),
      ["uint256", "address"]
    );
    assert.deepEqual(
      confirmations.outputs.map((x) => x.type),
      ["bool"]
    );
  });
});
