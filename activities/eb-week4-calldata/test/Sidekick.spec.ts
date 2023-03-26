import { assert } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Sidekick", function () {
  async function deployContract() {
    const Sidekick = await ethers.getContractFactory("Sidekick");
    const sidekick = await Sidekick.deploy();
    const Hero = await ethers.getContractFactory("Hero");
    const hero = await Hero.deploy();
    return { hero, sidekick };
  }

  it("should have alerted the hero", async () => {
    const { hero, sidekick } = await loadFixture(deployContract);
    await sidekick["sendAlert(address)"](hero.address);
    const alerted = await hero.alerted();
    assert.equal(alerted, true);
  });

  describe("after sending the alert", () => {
    it("should have the sidekick alert the hero", async () => {
      const { hero, sidekick } = await loadFixture(deployContract);
      await sidekick["sendAlert(address,uint256,bool)"](hero.address, 5, true);
      const ambush = await hero.ambush();
      assert(ambush.alerted);
      assert.equal(ambush.enemies, 5);
      assert.equal(ambush.armed, true);
    });
  });

  it("should have the sidekick alert the hero", async () => {
    const { hero, sidekick } = await loadFixture(deployContract);
    const calldata = hero.interface.encodeFunctionData("alert(uint256,bool)", [
      5,
      true,
    ]);
    await sidekick.relay(hero.address, calldata);
    const ambush = await hero.ambush();
    assert(ambush.alerted);
    assert.equal(ambush.enemies, 5);
    assert.equal(ambush.armed, true);
  });

  describe("after sending the alert", () => {
    it("should update the last contract", async () => {
      const { hero, sidekick } = await loadFixture(deployContract);
      await sidekick.makeContact(hero.address);
      const lastContact = await hero.lastContact();
      assert.notEqual(lastContact.toNumber(), 0);
    });
  });
});
