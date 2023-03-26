// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    address public owner;
    address public charityAddr;
    
    constructor(address _charityAddr) {
        owner = msg.sender;
        charityAddr = _charityAddr;
    }

    receive() external payable {}

    function tip() public payable {
        (bool s, ) = owner.call{ value: msg.value }("");
        require(s);
    }
    
    function donate() public {
        (bool s, ) = charityAddr.call{ value: address(this).balance }("");
        require(s);
        selfdestruct(payable(charityAddr));
    }
}