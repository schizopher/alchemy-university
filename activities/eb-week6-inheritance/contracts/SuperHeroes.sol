// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Hero.sol";
import "./Enemy.sol";

contract Mage is Hero(50) {
    function attack(address _addr) public override {
        Enemy(_addr).takeAttack(Hero.AttackTypes.Spell);
        super.attack(_addr);
    }
}

contract Warrior is Hero(200) {
    function attack(address _addr) public override {
        Enemy(_addr).takeAttack(Hero.AttackTypes.Brawl);
        super.attack(_addr);
    }
}
