// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Prime.sol";

contract PrimeGame {
    function isWinner() public view returns (bool) {
        if (Prime.isPrime(block.number)) return true;
        return false;
    }
}
