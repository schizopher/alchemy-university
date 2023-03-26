// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Switch {
    address owner;
    address recipient;
    uint lastPinged;

    constructor(address _recipient) payable {
        owner = msg.sender;
        recipient = _recipient;
        lastPinged = block.timestamp;
    }

    function withdraw() external {
        require(
            block.timestamp >= lastPinged + 52 weeks,
            "Too early to withdraw"
        );
        recipient.call{value: address(this).balance}("");
    }

    function ping() external {
        require(msg.sender == owner, "Only owner can ping");
        lastPinged = block.timestamp;
    }
}
