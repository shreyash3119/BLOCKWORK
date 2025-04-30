// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FreelanceEscrow {
    address public client;          // The client (who funds the contract)
    address public freelancer;      // The freelancer (who receives the payment)
    uint public amount;             // Amount to be paid to the freelancer
    bool public isFunded;           // Flag to check if the contract is funded
    bool public isReleased;         // Flag to check if the payment has been released

    // Events to log actions
    event ContractFunded(address indexed client, uint amount);
    event PaymentReleased(address indexed freelancer, uint amount);
    event ContractRefunded(address indexed client, uint amount);

    // Constructor that initializes the contract with the freelancer's address
    constructor(address _freelancer) {
        client = msg.sender;           // The sender of the contract (the client)
        freelancer = _freelancer;       // The freelancer's address passed during deployment
    }

    // Function to fund the contract (only the client can fund it)
    function fundContract() external payable {
        require(msg.sender == client, "Only client can fund");
        require(!isFunded, "Already funded");
        
        amount = msg.value;            // Store the amount of Ether sent to the contract
        isFunded = true;               // Mark the contract as funded
        emit ContractFunded(client, amount);  // Emit the event that the contract is funded
    }

    // Function to release the payment to the freelancer (only the client can release it)
    function releasePayment() external {
        require(msg.sender == client, "Only client can release");
        require(isFunded && !isReleased, "Invalid state");

        isReleased = true;             // Mark the payment as released
        payable(freelancer).transfer(amount);  // Transfer the funds to the freelancer
        emit PaymentReleased(freelancer, amount); // Emit the event that the payment has been released
    }

    // Optional function to refund the contract to the client if not yet funded or released
    function refundContract() external {
        require(msg.sender == client, "Only client can refund");
        require(!isFunded || (isFunded && !isReleased), "Cannot refund after release");

        uint refundAmount = amount;
        amount = 0;                     // Reset the contract amount
        isFunded = false;               // Mark the contract as not funded
        isReleased = false;             // Mark the payment as not released

        payable(client).transfer(refundAmount); // Refund the money back to the client
        emit ContractRefunded(client, refundAmount); // Emit the event that the contract has been refunded
    }

    // Public view function to get the contract details
    function getContractDetails() external view returns (address, address, uint, bool, bool) {
        return (client, freelancer, amount, isFunded, isReleased);
    }
}
