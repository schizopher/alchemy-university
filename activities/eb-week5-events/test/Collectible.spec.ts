import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { parseEther } from "ethers/lib/utils";

describe("Collectible", function () {
  describe("1. Deployed", () => {
    let deployedEvent;
    before(async () => {
      const Collectible = await ethers.getContractFactory("Collectible");
      const collectible = await Collectible.deploy();
      const receipt = await collectible.deployTransaction.wait();
      // get the topic for this escrow contract's Deployed event
      const topic = collectible.interface.getEventTopic("Deployed");
      const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
      if (log) deployedEvent = collectible.interface.parseLog(log);
    });
    it("should have emitted a deployed event", async () => {
      assert(deployedEvent, "Expected a Deployed event to be emitted!");
      assert.equal(
        deployedEvent.args.length,
        1,
        "Only expected 1 event value to be emitted!"
      );
      const [owner] = await ethers.provider.listAccounts();
      assert.equal(deployedEvent.args[0], owner);
    });
  });

  describe("2. Transfer", () => {
    let deployedEvent, response, collectible, owner, a2;
    before(async () => {
      [owner, a2] = await ethers.provider.listAccounts();
      const Collectible = await ethers.getContractFactory("Collectible");
      collectible = await Collectible.deploy();
      response = await collectible.transfer(a2);
      const receipt = await response.wait();
      const topic = collectible.interface.getEventTopic("Transfer");
      const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
      deployedEvent = collectible.interface.parseLog(log);
    });
    it("should emit a Transfer event", async () => {
      assert(deployedEvent, "Expected a Transfer event to be emitted!");
      assert.equal(
        deployedEvent.args.length,
        2,
        "Expected 2 event values to be emitted!"
      );
      assert.equal(
        deployedEvent.args[0],
        owner,
        "Expected the first return value to be the original owner address."
      );
      assert.equal(
        deployedEvent.args[1],
        a2,
        "Expected the second return value to be the new owner address."
      );
    });
    it("should revert if the original owner tries to transfer again", async () => {
      const signer = await ethers.provider.getSigner(owner);
      await expect(collectible.connect(signer).transfer(a2)).to.be.reverted;
    });
  });

  describe("3. Up for Sale", () => {
    let deployedEvent, oneEther, collectible, response, blockNumber;
    before(async () => {
      const Collectible = await ethers.getContractFactory("Collectible");
      collectible = await Collectible.deploy();
      oneEther = ethers.utils.parseEther("1.0");
      response = await collectible.markPrice(oneEther);
      const receipt = await response.wait();
      blockNumber = response.blockNumber;

      const topic = collectible.interface.getEventTopic("ForSale");
      const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
      deployedEvent = collectible.interface.parseLog(log);
    });

    it("should revert if a non-owner tries to mark the price", async () => {
      let [owner, a2] = await ethers.provider.listAccounts();
      const signer = await ethers.provider.getSigner(a2);
      await expect(collectible.connect(signer).markPrice(oneEther)).to.be
        .reverted;
    });

    it("should emit a ForSale event", async () => {
      let block = await ethers.provider.getBlock(blockNumber);
      let blockTimeStamp = block.timestamp;
      assert(deployedEvent, "Expected a ForSale event to be emitted!");
      assert.equal(
        deployedEvent.args.length,
        2,
        "Expected 2 event values to be emitted!"
      );
      assert.equal(
        deployedEvent.args[0].toHexString(16),
        oneEther.toHexString(16),
        "Expected the first return value to be the price."
      );
      assert.equal(
        deployedEvent.args[1].toNumber(),
        blockTimeStamp,
        "Expected the second return value to be the block timestamp."
      );
    });
  });

  describe("4. Sale", () => {
    let collectible, oneEther, halfEther, owner, a2, a3;
    before(async () => {
      const Collectible = await ethers.getContractFactory("Collectible");
      collectible = await Collectible.deploy();

      [owner, a2, a3] = await ethers.provider.listAccounts();
      oneEther = ethers.utils.parseEther("1.0");
      halfEther = ethers.utils.parseEther("0.5");
    });

    it("should revert if a purchase is attempted before the item is marked for sale", async () => {
      const signer = await ethers.provider.getSigner(a2);
      await expect(collectible.connect(signer).purchase()).to.be.reverted;
    });

    describe("after marking a price", () => {
      before(async () => {
        await collectible.markPrice(oneEther);
      });

      it("should revert if a purchase is attempted with less money than the price", async () => {
        const signer = await ethers.provider.getSigner(a2);
        await expect(collectible.connect(signer).purchase({ value: halfEther }))
          .to.be.reverted;
      });
    });

    describe("after purchasing", () => {
      let response, initialBalance, purchaseEvent;
      before(async () => {
        initialBalance = await ethers.provider.getBalance(owner);

        const signer = await ethers.provider.getSigner(a2);
        response = await collectible
          .connect(signer)
          .purchase({ value: oneEther });

        const receipt = await response.wait();
        purchaseEvent = receipt.events.find((x) => x.event === "Purchase");
      });

      it("should emit a Purchase event", async () => {
        assert(purchaseEvent, "Expected a Purchase event to be emitted!");
        assert.equal(
          purchaseEvent.args.length,
          2,
          "Expected 2 event values to be emitted!"
        );
        assert.equal(
          purchaseEvent.args[0].toString(),
          ethers.utils.parseEther("1").toString(),
          "Expected the first return value to be the price."
        );
        assert.equal(
          purchaseEvent.args[1],
          a2,
          "Expected the second return value to be the new owner address."
        );
      });

      it("should pay the owner", async () => {
        const balanceAfter = await ethers.provider.getBalance(owner);
        assert.equal(
          balanceAfter.sub(initialBalance).toString(),
          ethers.utils.parseEther("1").toString()
        );
      });

      it("should fail on the next purchase attempt", async () => {
        const signer = await ethers.provider.getSigner(a3);
        await expect(
          collectible.connect(signer).purchase({ value: parseEther("1") })
        ).to.be.reverted;
      });

      describe("after marking a new price", () => {
        before(async () => {
          const signer = await ethers.provider.getSigner(a2);
          await collectible.connect(signer).markPrice(parseEther("1"));
        });

        it("should allow a purchase", async () => {
          const signer = await ethers.provider.getSigner(a3);
          const response = await collectible
            .connect(signer)
            .purchase({ value: parseEther("1") });
          const receipt = await response.wait();
          const purchaseEvent = receipt.events.find(
            (x) => x.event === "Purchase"
          );
          assert(purchaseEvent, "Expected a Purchase event to be emitted!");
        });
      });
    });
  });

  describe("5. Indexed", () => {
    let artifacts;
    before(async () => {
      artifacts = await hre.artifacts.readArtifact("Collectible");
    });

    it("should have indexed the Deployed event address", () => {
      const deployedEvent = artifacts.abi.find((x) => x.name === "Deployed");
      assert(
        deployedEvent,
        "Expected to find a Deployed event on your contract ABI!"
      );
      const { inputs } = deployedEvent;
      assert.equal(
        inputs.length,
        1,
        "Expected to find a single input on the Deployed event!"
      );
      assert(
        inputs[0].indexed,
        "Expected the address input to be indexed on the Deployed event!"
      );
    });

    it("should have indexed the Transfer event addresses", () => {
      const transferEvent = artifacts.abi.find((x) => x.name === "Transfer");
      assert(
        transferEvent,
        "Expected to find a Transfer event on your contract ABI!"
      );
      const { inputs } = transferEvent;
      assert.equal(
        inputs.length,
        2,
        "Expected to find a two inputs on the Transfer event!"
      );
      assert(
        inputs[0].indexed,
        "Expected the first address input to be indexed on the Transfer event!"
      );
      assert(
        inputs[1].indexed,
        "Expected the second address input to be indexed on the Transfer event!"
      );
    });

    it("should have indexed the Purchase event addresses", () => {
      const purchaseEvent = artifacts.abi.find((x) => x.name === "Purchase");
      assert(
        purchaseEvent,
        "Expected to find a Purchase event on your contract ABI!"
      );
      const { inputs } = purchaseEvent;
      assert.equal(
        inputs.length,
        2,
        "Expected to find a two inputs on the Purchase event!"
      );
      assert(
        inputs[1].indexed,
        "Expected the address input to be indexed on the Purchase event!"
      );
    });
  });
});
