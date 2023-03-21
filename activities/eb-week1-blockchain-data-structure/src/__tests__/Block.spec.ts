import { sha256 } from "ethereum-cryptography/sha256";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { assert } from "chai";
import { faker } from "@faker-js/faker";

import Block from "../Block";

describe("Block", function () {
  const newBlock = new Block("test");
  it("should have a hash property", function () {
    assert(/^[0-9A-F]{64}$/i.test(newBlock.toHash()));
  });
  it("should store a random name", function () {
    const randomName = faker.name.fullName();
    assert.equal(randomName, new Block(randomName).data);
  });
  it("should hash some random data", function () {
    const randomEmail = faker.internet.email();
    const myHash = toHex(sha256(utf8ToBytes(randomEmail)));
    const yourHash = new Block(randomEmail).toHash();
    assert.equal(myHash, yourHash);
  });
});
