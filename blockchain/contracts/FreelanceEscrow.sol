// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FreelanceEscrow {
    address public client;
    address public freelancer;
    uint public amount;
    bool public isFunded;
    bool public isReleased;

    constructor(address _freelancer) {
        client = msg.sender;
        freelancer = _freelancer;
    }

    function fundContract() external payable {
        require(msg.sender == client, "Only client can fund");
        require(!isFunded, "Already funded");
        amount = msg.value;
        isFunded = true;
    }

    function releasePayment() external {
        require(msg.sender == client, "Only client can release");
        require(isFunded && !isReleased, "Invalid state");
        isReleased = true;
        payable(freelancer).transfer(amount);
    }
}
