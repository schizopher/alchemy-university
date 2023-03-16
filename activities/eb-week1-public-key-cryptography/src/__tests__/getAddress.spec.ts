import { getPublicKey } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { assert } from "chai";
import getAddress from "../getAddress";

const PRIVATE_KEY =
  "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
const EXPECTED_ADDRESS = "16bB6031CBF3a12B899aB99D96B64b7bbD719705";

describe("Get Address", () => {
  it("should get the address from a public key", async () => {
    const publicKey = getPublicKey(PRIVATE_KEY);
    const address = toHex(getAddress(publicKey));
    assert.equal(address.toLowerCase(), EXPECTED_ADDRESS.toLowerCase());
  });
});
