// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hero {
    uint public health = 100;
    uint public energy = 10;

    constructor(uint _health) {
        health = _health;
    }

    enum AttackTypes {
        Brawl,
        Spell
    }

    function attack(address) public virtual {
        energy--;
    }

    function takeDamage(uint damage) external {
        health -= damage;
    }
}
