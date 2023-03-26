// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IERC20.sol";

contract Chest {
    function plunder(address[] memory _addrs) external {
        for (uint i = 0; i < _addrs.length; i++) {
            address _addr = _addrs[i];
            uint256 _bal = IERC20(_addr).balanceOf(address(this));
            IERC20(_addr).transfer(msg.sender, _bal);
        }
    }
}
