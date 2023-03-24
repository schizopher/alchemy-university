// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Escrow {
    event Approved(uint256 _balance);

    address public depositor;
    address public beneficiary;
    address public arbiter;
    bool public isApproved;

    constructor(address _arbiter, address _beneficiary) payable {
        depositor = msg.sender;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
    }

    function approve() external {
        require(msg.sender == arbiter, "Only the arbiter can approve");
        isApproved = true;
        emit Approved(address(this).balance);
        (bool success, ) = beneficiary.call{value: address(this).balance}("");
        require(success, "Failed to send ether.");
    }
}
