import type { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { assert } from "chai";
import { TransactionReceipt } from "@ethersproject/providers";

const ATTACK_TYPES = {
  BRAWL: 0,
  SPELL: 1,
};

describe("Mage", () => {
  let mage: Contract;

  before(async () => {
    const Mage = await ethers.getContractFactory("Mage");
    mage = await Mage.deploy();
    await mage.deployed();
  });

  it("should have 100 health initially", async () => {
    const health = await mage.health();
    assert.equal(health.toNumber(), 50);
  });

  it("should take damage", async () => {
    await mage.takeDamage(10);
    const health = await mage.health();
    assert.equal(health.toNumber(), 40);
  });

  describe("attack", () => {
    let Enemy: ContractFactory;
    let enemy: Contract;
    let receipt: TransactionReceipt;

    before(async () => {
      Enemy = await ethers.getContractFactory("Enemy");
      enemy = await Enemy.deploy();
      await enemy.deployed();
      const tx = await mage.attack(enemy.address);
      receipt = await tx.wait();
    });

    it("should attack the enemy with a spell type attack", async () => {
      const topic = Enemy.interface.getEventTopic("Attacked");
      const log = receipt.logs.find((x) => x.topics[0] === topic);
      assert(
        log,
        "Expected the enemy to take an attack! Attack not registered on the enemy."
      );
      assert.equal(
        Number(log.data),
        ATTACK_TYPES.SPELL,
        "Expected the attack from mage to be of AttackType Spell"
      );
    });

    it("should use some energy", async () => {
      const energy = await mage.energy();
      assert.equal(energy, 9);
    });
  });
});
