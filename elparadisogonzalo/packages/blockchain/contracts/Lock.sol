// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public unlockBlock;  // change to block number
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockBlock) payable {
        require(
            block.number < _unlockBlock,
            "Unlock block should be in the future"
        );

        unlockBlock = _unlockBlock;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock block is %o and current block number is %o", unlockBlock, block.number);

        require(block.number >= unlockBlock, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.number);

        owner.transfer(address(this).balance);
    }
}

