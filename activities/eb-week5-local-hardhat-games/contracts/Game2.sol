//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Game2 {
    uint256 public x;
    uint256 public y;

    function setX(uint256 _x) external {
        x = _x;
    }

    function setY(uint256 _y) external {
        y = _y;
    }

    event Winner(address winner);

    function win() public {
        require(x > 0 && y > 0);
        require(x + y == 50);
        emit Winner(msg.sender);
    }
}
