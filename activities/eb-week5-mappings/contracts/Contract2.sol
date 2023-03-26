// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract2 {
    mapping(address => User) public users;

    struct User {
        uint256 balance;
        bool isActive;
    }

    function createUser() external {
        require(!users[msg.sender].isActive, "User already exists.");
        users[msg.sender] = User(100, true);
    }

    function transfer(address recipient, uint256 amount) external {
        require(users[msg.sender].isActive, "Sender is not active");
        require(users[recipient].isActive, "Receipient is not active");
        require(users[msg.sender].balance >= amount, "Inadequate balance.");
        users[msg.sender].balance -= amount;
        users[recipient].balance += amount;
    }
}
