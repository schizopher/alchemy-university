// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract StackClub {
    address[] members;
    address public owner;

    constructor() {
        owner = msg.sender;
        members.push(msg.sender);
    }

    function addMember(address _addr) external {
        require(isMember(msg.sender), "Only members can add other members.");
        members.push(_addr);
    }

    function isMember(address _addr) public view returns (bool) {
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == _addr) return true;
        }
        return false;
    }

    function removeLastMember() public {
        require(isMember(msg.sender), "Only members can remove members.");
        members.pop();
    }
}
