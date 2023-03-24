// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hero {
    bool public alerted;
    Ambush public ambush;
    uint public lastContact;

    struct Ambush {
        bool alerted;
        uint enemies;
        bool armed;
    }

    function alert() external {
        alerted = true;
    }

    function alert(uint enemies, bool armed) external {
        ambush = Ambush(true, enemies, armed);
    }

    fallback() external {
        lastContact = block.timestamp;
    }
}
