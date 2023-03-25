import { expect } from "chai";
import { ethers } from "hardhat";

describe("Bucket", function () {
  it("should be able to win game", async () => {
    const Bucket = await ethers.getContractFactory("Bucket");
    const bucket = await Bucket.deploy();
    await bucket.deployed();

    const BucketToken = await ethers.getContractFactory("BucketToken");
    const bucketToken = await BucketToken.deploy();
    await bucketToken.deployed();

    const tokenAmount = 1000;
    await bucketToken.approve(bucket.address, tokenAmount);
    const tx = await bucket.drop(bucketToken.address, tokenAmount);

    await expect(tx).to.emit(bucket, "Winner");
  });
});
