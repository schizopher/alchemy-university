// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract GetterContract {
	uint public value;

	constructor(uint _value) {
		value = _value;
	}
}
