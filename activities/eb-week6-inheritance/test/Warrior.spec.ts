import type { TransactionReceipt } from "@ethersproject/providers";
import type { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { assert } from "chai";

const ATTACK_TYPES = {
  BRAWL: 0,
  SPELL: 1,
};

describe("Warrior", () => {
  let warrior: Contract;

  before(async () => {
    const Warrior = await ethers.getContractFactory("Warrior");
    warrior = await Warrior.deploy();
    await warrior.deployed();
  });

  it("should have 200 health initially", async () => {
    const health = await warrior.health();
    assert.equal(health.toNumber(), 200);
  });

  it("should take damage", async () => {
    await warrior.takeDamage(10);
    const health = await warrior.health();
    assert.equal(health.toNumber(), 190);
  });

  describe("attack", () => {
    let Enemy: ContractFactory;
    let enemy: Contract;
    let receipt: TransactionReceipt;

    before(async () => {
      Enemy = await ethers.getContractFactory("Enemy");
      enemy = await Enemy.deploy();
      await enemy.deployed();
      const tx = await warrior.attack(enemy.address);
      receipt = await tx.wait();
    });

    it("should attack the enemy with a brawl type attack", async () => {
      const topic = Enemy.interface.getEventTopic("Attacked");
      const log = receipt.logs.find((x) => x.topics[0] === topic);
      assert(
        log,
        "Expected the enemy to take an attack! Attack not registered on the enemy."
      );
      assert.equal(
        Number(log.data),
        ATTACK_TYPES.BRAWL,
        "Expected the attack from warrior to be of AttackType Brawl"
      );
    });

    it("should use some energy", async () => {
      const energy = await warrior.energy();
      assert.equal(energy, 9);
    });
  });
});
