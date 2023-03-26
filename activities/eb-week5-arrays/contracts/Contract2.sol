// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract2 {
    function sum(uint[] calldata numbers) public pure returns (uint) {
        uint output = 0;
        for (uint i = 0; i < numbers.length; i++) {
            output += numbers[i];
        }
        return output;
    }
}
