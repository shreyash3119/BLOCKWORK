import { ethers } from "ethers";

// ABI of the deployed contract
const contractABI = [
  // Replace with actual contract ABI (Example given below)
  {
    "inputs": [{"internalType": "address", "name": "_freelancer", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "amount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "client",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "freelancer",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fundContract",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isFunded",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isReleased",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "releasePayment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with your contract address

let provider;
let signer;
let contract;

// Initialize ethers.js
const initEthers = async () => {
  if (window.ethereum) {
    // Request access to the user's Ethereum account
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    alert("Please install MetaMask to interact with the contract.");
  }
};

// Fund the contract with Ethereum
const fundContract = async () => {
  try {
    const tx = await contract.fundContract({
      value: ethers.utils.parseEther("1.0") // Amount to fund in Ether
    });
    console.log("Transaction Hash: ", tx.hash);
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Transaction Confirmed!");
  } catch (error) {
    console.error("Error funding contract: ", error);
  }
};

// Release payment to the freelancer
const releasePayment = async () => {
  try {
    const tx = await contract.releasePayment();
    console.log("Transaction Hash: ", tx.hash);
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Payment Released!");
  } catch (error) {
    console.error("Error releasing payment: ", error);
  }
};

// Get contract details
const getClientDetails = async () => {
  const clientAddress = await contract.client();
  console.log("Client Address: ", clientAddress);
  return clientAddress;
};

const getFreelancerDetails = async () => {
  const freelancerAddress = await contract.freelancer();
  console.log("Freelancer Address: ", freelancerAddress);
  return freelancerAddress;
};

const getContractAmount = async () => {
  const amount = await contract.amount();
  console.log("Contract Amount: ", ethers.utils.formatEther(amount));
  return ethers.utils.formatEther(amount);
};

export { initEthers, fundContract, releasePayment, getClientDetails, getFreelancerDetails, getContractAmount };
