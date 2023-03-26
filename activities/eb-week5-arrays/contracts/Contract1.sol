// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract1 {
    function sum(uint[5] memory numbers) public pure returns (uint) {
        uint output = 0;
        for (uint i = 0; i < 5; i++) {
            output += numbers[i];
        }
        return output;
    }
}
