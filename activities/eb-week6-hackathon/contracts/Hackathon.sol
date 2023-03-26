// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hackathon {
    struct Project {
        string title;
        uint[] ratings;
    }

    Project[] projects;

    // TODO: add the findWinner function
    function findWinner() external view returns (Project memory) {
        Project memory winner = projects[0];
        uint highestRating = avg(projects[0].ratings);
        for (uint i = 0; i < projects.length; i++) {
            uint avgRating = avg(projects[i].ratings);
            if (avgRating > highestRating) {
                winner = projects[i];
                highestRating = avgRating;
            }
        }
        return winner;
    }

    function avg(uint[] memory values) internal pure returns (uint) {
        uint sum = 0;
        for (uint i = 0; i < values.length; i++) {
            sum += values[i];
        }
        return sum / values.length;
    }

    function newProject(string calldata _title) external {
        // creates a new project with a title and an empty ratings array
        projects.push(Project(_title, new uint[](0)));
    }

    function rate(uint _idx, uint _rating) external {
        // rates a project by its index
        projects[_idx].ratings.push(_rating);
    }
}
