// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract5 {
    function double(uint256 _value) external pure returns (uint256) {
        return _value * 2;
    }

    function double(uint256 _val1, uint256 _val2)
        external
        pure
        returns (uint256, uint256)
    {
        return (_val1 * 2, _val2 * 2);
    }
}
