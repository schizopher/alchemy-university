// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BucketToken is ERC20 {
  constructor() ERC20("Fixed", "BKT") {
    _mint(msg.sender, 1000);
  }
}