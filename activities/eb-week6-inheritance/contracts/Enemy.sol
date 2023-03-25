// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Hero.sol";

contract Enemy {
    event Attacked(Hero.AttackTypes attackType);

    constructor() {}

    function takeAttack(Hero.AttackTypes attackType) external {
        emit Attacked(attackType);
    }
}
