// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IContract {
    function attempt() external;
}

contract ContractCaller {
    address public contractAddress;

    constructor(address _contractAddress) {
        contractAddress = _contractAddress;
    }

    function setContractAddress(address _contractAddress) external {
        contractAddress = _contractAddress;
    }

    function sendAttempt() external {
        IContract(contractAddress).attempt();
    }
}
