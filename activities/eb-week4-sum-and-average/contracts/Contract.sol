// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    function sumAndAverage(
        uint val1,
        uint val2,
        uint val3,
        uint val4
    ) external pure returns (uint, uint) {
        uint sum = val1 + val2 + val3 + val4;
        uint average = sum / 4;
        return (sum, average);
    }
}
