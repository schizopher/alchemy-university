// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Token {
    event Transfer(address _from, address _to, uint256 _amount);

    uint256 public totalSupply;
    string public name = "Dogecoin";
    string public symbol = "DOG";
    uint8 public decimals = 18;

    mapping(address => uint256) public balances;

    constructor() {
        totalSupply = 1000 * 10 ** decimals;
        balances[msg.sender] = 1000 * 10 ** decimals;
    }

    function balanceOf(address _addr) external view returns (uint256) {
        return balances[_addr];
    }

    function transfer(address _to, uint256 _amount) public returns (bool) {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }
}
