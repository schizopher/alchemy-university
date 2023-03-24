// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    uint counter;

    constructor() {
        counter = 0;
    }

    function tick() external {
        counter++;
        if (counter >= 10) {
            selfdestruct(payable(msg.sender));
        }
    }
}
