// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IHero {
    function alert() external;
}

contract Sidekick {
    function sendAlert(address hero) external {
        bytes4 signature = bytes4(keccak256("alert()"));
        (bool success, ) = hero.call(abi.encodePacked(signature));
        require(success);
    }

    function sendAlert(address hero, uint enemies, bool armed) external {
        (bool success, ) = hero.call(
            abi.encodeWithSignature("alert(uint256,bool)", enemies, armed)
        );
        require(success);
    }

    function relay(address hero, bytes memory data) external {
        hero.call(data);
    }

    function makeContact(address hero) external {
        // TODO: trigger the hero's fallback function!
        hero.call(abi.encodeWithSignature("random()"));
    }
}
