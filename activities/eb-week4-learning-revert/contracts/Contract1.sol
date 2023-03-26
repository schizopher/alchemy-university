// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract1 {
    address public owner;

    constructor() payable {
        require(msg.value >= 1 ether, "1 ETH Deposit required"); 
        owner = msg.sender;
    }
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        owner.call{ value: address(this).balance }("");
    }
}