// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint256 public required;

    struct Transaction {
        address addr;
        uint256 value;
        bool executed;
        bytes data;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;
    mapping(uint256 => mapping(address => bool)) public confirmations;

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "Must have more than one owner");
        require(_required > 0, "Required confirmations must more more than 0");
        require(
            _required <= _owners.length,
            "Required confirmations must be fewer than number of owners"
        );
        owners = _owners;
        required = _required;
        transactionCount = 0;
    }

    // Function should be internal, but for testing purposes it is public
    function addTransaction(
        address _addr,
        uint256 _value,
        bytes memory _data
    ) public returns (uint256) {
        transactions[transactionCount] = Transaction(
            _addr,
            _value,
            false,
            _data
        );
        transactionCount++;
        return transactionCount - 1;
    }

    function confirmTransaction(uint256 _transactionId) public {
        require(isOwner(msg.sender), "Sender is not an owner");
        confirmations[_transactionId][msg.sender] = true;
        if (isConfirmed(_transactionId)) executeTransaction(_transactionId);
    }

    function submitTransaction(
        address _addr,
        uint256 _value,
        bytes memory _data
    ) external {
        uint256 transactionId = addTransaction(_addr, _value, _data);
        confirmTransaction(transactionId);
    }

    function getConfirmationsCount(
        uint256 _transactionId
    ) public view returns (uint256) {
        uint256 output = 0;
        for (uint i = 0; i < owners.length; i++) {
            if (confirmations[_transactionId][owners[i]]) output += 1;
        }
        return output;
    }

    function isOwner(address _addr) internal view returns (bool) {
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == _addr) return true;
        }
        return false;
    }

    function isConfirmed(uint256 _transactionId) public view returns (bool) {
        uint256 confirmationsCount = getConfirmationsCount(_transactionId);
        return confirmationsCount >= required;
    }

    function executeTransaction(uint256 _transactionId) public {
        require(
            isConfirmed(_transactionId),
            "Transaction has not been confirmed"
        );
        require(
            !transactions[_transactionId].executed,
            "Transaction has already been executed"
        );
        transactions[_transactionId].addr.call{
            value: transactions[_transactionId].value
        }(transactions[_transactionId].data);
        transactions[_transactionId].executed = true;
    }

    receive() external payable {}
}
