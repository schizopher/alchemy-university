import { assert } from "chai";
import { toHex } from "ethereum-cryptography/utils";
import hashMessage from "../hashMessage";

const helloWorldHex =
  "47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";

describe("Hash Message", () => {
  it("should return the keccak256 hash of hello world", () => {
    const messageHash = hashMessage("hello world");
    assert.equal(toHex(messageHash), helloWorldHex);
  });
});
