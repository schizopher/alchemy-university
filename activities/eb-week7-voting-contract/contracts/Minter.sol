// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Minter {
    uint public minted;

    function mint(uint _amount) external {
        minted = _amount;
    }
}
