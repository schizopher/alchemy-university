// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract2 {
	address owner;
	uint configA;
	uint configB;
	uint configC;

	constructor() {
		owner = msg.sender;
	}

	function setA(uint _configA) public onlyOwner {
		configA = _configA;
	}

	function setB(uint _configB) public onlyOwner {
		configB = _configB;
	}

	function setC(uint _configC) public onlyOwner {
		configC = _configC;
	}

	modifier onlyOwner {
		// TODO: require only the owner access
		require(msg.sender == owner, "onlyOwner");
		// TODO: run the rest of the function body
		_;
	}
}
