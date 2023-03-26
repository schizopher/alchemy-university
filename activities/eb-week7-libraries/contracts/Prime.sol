// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Prime {
    function dividesEvenly(
        uint numerator,
        uint denominator
    ) public pure returns (bool) {
        return numerator % denominator == 0;
    }

    function isPrime(uint num) public pure returns (bool) {
        for (uint i = 2; i < num; i++) {
            if (dividesEvenly(num, i)) return false;
        }
        return true;
    }
}
