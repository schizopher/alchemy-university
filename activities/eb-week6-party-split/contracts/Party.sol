// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    address[] participants;
    uint256 amt;

    constructor(uint256 _amt) {
        amt = _amt;
    }

    function rsvp() external payable {
        require(msg.value == amt, "Must be exact amount.");
        require(!isParticipant(msg.sender), "Sender has already RSVPed");
        participants.push(msg.sender);
    }

    function isParticipant(address _addr) internal view returns (bool) {
        for (uint i = 0; i < participants.length; i++) {
            if (participants[i] == _addr) return true;
        }
        return false;
    }

    function payBill(address _addr, uint _bill) external {
        uint splitAmt = (address(this).balance - _bill) / participants.length;
        _addr.call{value: _bill}("");
        for (uint i = 0; i < participants.length; i++) {
            participants[i].call{value: splitAmt}("");
        }
    }
}
