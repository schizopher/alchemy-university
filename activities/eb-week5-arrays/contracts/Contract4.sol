// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract4 {
    function filterEven(
        uint[] calldata numbers
    ) external pure returns (uint[] memory) {
        uint numEven = 0;
        for (uint i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0) numEven++;
        }
        uint index = 0;
        uint[] memory output = new uint[](numEven);
        for (uint i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0) {
                output[index] = numbers[i];
                index++;
            }
        }
        return output;
    }
}
