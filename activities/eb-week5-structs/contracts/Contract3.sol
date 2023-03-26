// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract3 {
    enum Choices {
        Yes,
        No
    }

    struct Vote {
        Choices choice;
        address voter;
    }

    Vote[] public votes;

    function createVote(Choices choice) external {
        require(!hasVoted(msg.sender), "Each address can only vote once.");
        votes.push(Vote(choice, msg.sender));
    }

    function findVote(address _addr) internal view returns (Vote memory) {
        for (uint256 i = 0; i < votes.length; i++) {
            if (votes[i].voter == _addr) return votes[i];
        }
        return Vote(Choices(0), address(0));
    }

    function hasVoted(address _addr) public view returns (bool) {
        Vote memory vote = findVote(_addr);
        return vote.voter != address(0);
    }

    function findChoice(address _addr) external view returns (Choices) {
        Vote memory vote = findVote(_addr);
        return vote.choice;
    }

    function changeVote(Choices _choice) external {
        require(hasVoted(msg.sender), "msg.sender has not voted.");
        for (uint256 i = 0; i < votes.length; i++) {
            if (votes[i].voter == msg.sender) {
                votes[i].choice = _choice;
            }
        }
    }
}
