// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    event ProposalCreated(uint256 _proposalId);
    event VoteCast(uint256 _proposalId, address _addr);

    enum Vote {
        Null,
        Yes,
        No
    }

    struct Proposal {
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
    }

    address[] public members;
    Proposal[] public proposals;
    mapping(uint256 => mapping(address => Vote)) public voteHistory;

    constructor(address[] memory _members) {
        members = _members;
        members.push(msg.sender);
    }

    function newProposal(address _addr, bytes memory _calldata) external {
        require(isMember(msg.sender), "Only members can create proposals.");
        proposals.push(Proposal(_addr, _calldata, 0, 0));
        emit ProposalCreated(proposals.length - 1);
    }

    function castVote(uint _proposalId, bool _vote) external {
        require(isMember(msg.sender), "Only members can vote.");
        emit VoteCast(_proposalId, msg.sender);
        if (voteHistory[_proposalId][msg.sender] == Vote.Null) {
            if (_vote) {
                proposals[_proposalId].yesCount += 1;
                voteHistory[_proposalId][msg.sender] = Vote.Yes;
            } else {
                proposals[_proposalId].noCount += 1;
                voteHistory[_proposalId][msg.sender] = Vote.No;
            }
        } else if (voteHistory[_proposalId][msg.sender] == Vote.Yes) {
            if (!_vote) {
                proposals[_proposalId].yesCount -= 1;
                proposals[_proposalId].noCount += 1;
                voteHistory[_proposalId][msg.sender] = Vote.No;
            }
        } else if (voteHistory[_proposalId][msg.sender] == Vote.No) {
            if (_vote) {
                proposals[_proposalId].noCount -= 1;
                proposals[_proposalId].yesCount += 1;
                voteHistory[_proposalId][msg.sender] = Vote.Yes;
            }
        }
        if (proposals[_proposalId].yesCount >= 10) {
            proposals[_proposalId].target.call(proposals[_proposalId].data);
        }
    }

    function isMember(address _addr) internal view returns (bool) {
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == _addr) return true;
        }
        return false;
    }
}
