//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Game5 {
    mapping(address => uint256) balances;
    mapping(address => uint256) allowances;

    function giveMeAllowance(uint256 allowance) external {
        allowances[msg.sender] += allowance;
    }

    function mint(uint256 amount) external {
        allowances[msg.sender] -= amount;
        balances[msg.sender] += amount;
    }

    event Winner(address winner);

    function win() public {
        require(balances[msg.sender] >= 10000);
        emit Winner(msg.sender);
    }
}
