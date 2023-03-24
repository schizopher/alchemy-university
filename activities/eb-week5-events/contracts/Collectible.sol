// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    event Deployed(address indexed _addr);
    event Transfer(address indexed _from, address indexed _to);
    event ForSale(uint256 _price, uint256 _timestamp);
    event Purchase(uint256 _amount, address indexed _buyer);

    address public owner;
    uint256 public price;

    constructor() {
        emit Deployed(msg.sender);
        owner = msg.sender;
    }

    function transfer(address _to) external {
        require(msg.sender == owner, "Not current owner.");
        emit Transfer(owner, _to);
        owner = _to;
    }

    function markPrice(uint256 _price) external {
        require(msg.sender == owner, "Not current owner.");
        emit ForSale(_price, block.timestamp);
        price = _price;
    }

    function purchase() external payable {
        require(price == msg.value, "Value doesn't match price");
        require(price > 0, "Not for sale.");
        emit Purchase(msg.value, msg.sender);
        (bool success, ) = owner.call{value: msg.value}("");
        price = 0;
        owner = msg.sender;
        require(success);
    }
}
