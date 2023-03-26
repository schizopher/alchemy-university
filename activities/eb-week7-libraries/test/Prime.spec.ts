import type { Contract } from "ethers";
import { assert } from "chai";
import { ethers } from "hardhat";

describe("Prime", function () {
  let library: Contract;

  before(async () => {
    const Prime = await ethers.getContractFactory("Prime");
    library = await Prime.deploy();
    await library.deployed();
  });

  it("should detect numbers that evenly divide", async () => {
    const pairs = [
      [4, 2],
      [16, 4],
      [200, 50],
    ];
    for (let i = 0; i < pairs.length; i++) {
      const [x, y] = pairs[i];
      const dividesEvenly = await library.callStatic.dividesEvenly(x, y);
      assert(
        dividesEvenly,
        `Expected dividesEvenly to return true for ${x} divided by ${y}!`
      );
    }
  });

  it("should detect numbers that do not evenly divide", async () => {
    const pairs = [
      [5, 2],
      [22, 4],
      [199, 50],
    ];
    for (let i = 0; i < pairs.length; i++) {
      const [x, y] = pairs[i];
      const dividesEvenly = await library.callStatic.dividesEvenly(x, y);
      assert(
        !dividesEvenly,
        `Expected dividesEvenly to return false for ${x} divided by ${y}!`
      );
    }
  });

  it("should detect prime numbers", async () => {
    const primes = [5, 17, 47];
    for (let i = 0; i < primes.length; i++) {
      const prime = primes[i];
      const isPrime = await library.callStatic.isPrime(prime);
      assert(isPrime, `Expected isPrime to return true for ${prime}!`);
    }
  });

  it("should detect non-prime numbers", async () => {
    const nonPrimes = [4, 18, 51];
    for (let i = 0; i < nonPrimes.length; i++) {
      const nonPrime = nonPrimes[i];
      const isPrime = await library.callStatic.isPrime(nonPrime);
      assert(
        !isPrime,
        `Did not expect isPrime to return true for ${nonPrime}!`
      );
    }
  });
});
